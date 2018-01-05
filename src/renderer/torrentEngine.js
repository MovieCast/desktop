/* eslint-disable no-param-reassign, no-plusplus, no-underscore-dangle */

/**
 * Manager for WebTorrent
 *
 * A lot of the code here is inspired
 * by WebTorrent Desktop
 *
 * @todo
 * The torrent engine causes the UI to lagg
 * In order to fix this the torrent engine should
 * move to it's own window (doing that right now...)
 */

import { ipcRenderer as ipc } from 'electron';
// import TorrentEngine from '../main/TorrentEngine';
import crypto from 'crypto';
// import { EventEmitter } from 'events';
import { announceList } from 'create-torrent';
import WebTorrent from 'webtorrent';
import zeroFill from 'zero-fill';
import networkAddress from 'network-address';
import pkg from '../package.json';

console.time('init');

// Force use of webtorrent trackers on all torrents
global.WEBTORRENT_ANNOUNCE = announceList
  .map((arr) => arr[0])
  .filter((url) => url.indexOf('wss://') === 0 || url.indexOf('ws://') === 0);

/**
 * Version number in Azureus-style. Generated from major and minor semver version.
 * For example:
 *   '0.0.1' -> '0000'
 *   '0.1.0' -> '0001'
 *   '1.1.0' -> '0101'
 */
const VERSION = pkg.version;

/**
 * Version prefix string (used in peer ID). MovieCast uses the Azureus-style
 * encoding: '-', two characters for client id ('MC'), four ascii digits for version
 * number, '-', followed by random numbers.
 * For example:
 *   '-MC0000-'...
 */
const VERSION_STR = VERSION.match(/([0-9]+)/g)
  .slice(0, 2)
  .map((v) => zeroFill(2, v))
  .join('');
/**
 * Version prefix string (used in peer ID). MovieCast uses the Azureus-style
 * encoding: '-', two characters for client id ('MC'), four ascii digits for version
 * number, '-', followed by random numbers.
 * For example:
 *   '-MC0000-'...
 */
const VERSION_PREFIX = `-MC${VERSION_STR}-`;

/**
 * Generate an ephemeral peer ID each time.
 */
const PEER_ID = Buffer.from(VERSION_PREFIX + crypto.randomBytes(9).toString('base64'));

// Connect to the WebTorrent and BitTorrent networks.
// MovieCast is just like WebTorrent Desktop a hybrid
// client, as explained here: https://webtorrent.io/faq
let client = new WebTorrent({ peerId: PEER_ID });

// WebTorrent-to-HTTP streaming sever
let server = null;

init();

function init() {
  console.info('Initializing Torrent Engine...');

  listenToClientEvents();

  ipc.on('te-addTorrent', (event, torrentKey, torrentID, path, fileModtimes, selections) => {
    addTorrent(torrentKey, torrentID, path, fileModtimes, selections);
  });

  ipc.on('te-removeTorrent', (event, torrentID) => {
    removeTorrent(torrentID);
  });

  ipc.on('te-startStreamServer', (event, torrentID) => {
    startStreamServer(torrentID);
  });

  ipc.on('te-stopStreamServer', () => {
    stopStreamServer();
  });

  // torrentEngine.on('torrent-progress')

  console.timeEnd('init');
}

function listenToClientEvents() {
  client.on('warning', (err) => ipc.send('te-warning', err));
  client.on('error', (err) => ipc.send('te-error', err));

  console.info('Listening to engine events.');
}

function addTorrent(torrentKey, torrentID, path, fileModtimes, selections) {
  console.log(`Starting torrent ${torrentID}`);

  const torrent = client.add(torrentID, {
    path,
    fileModtimes
  });

  torrent.key = torrentKey;

  addTorrentEvents(torrent);

  // If we only select certain files don't download the others
  torrent.once('ready', () => selectFiles(torrent, selections));
}

function removeTorrent(torrentID) {
  console.log(`Stopping torrent ${torrentID}`);

  const torrent = client.get(torrentID);
  if (torrent) torrent.destroy();
  clearInterval(torrent.progressInterval);
}

function addTorrentEvents(torrent) {
  torrent.on('warning', err => ipc.send('te-warning', err));
  torrent.on('error', err => ipc.send('te-error', err));
  torrent.once('infoHash', onInfoHash);
  torrent.once('metadata', onMetadata);
  torrent.once('ready', onReady);
  torrent.once('done', onDone);

  // Update torrent progress every 1000 ms
  // TODO: Only update when progress state changed
  torrent.progressInterval = setInterval(onProgress, 1000);

  function onInfoHash() {
    console.log(`Torrent#${torrent.key}: received infohash: ${torrent.infoHash}`);
    // dispatch(torrentInfoHash(torrent.key, torrent.infoHash));
    ipc.send('te-infohash', torrent.key, torrent.infoHash);
    onProgress();
  }

  function onMetadata() {
    console.log(`Torrent#${torrent.key}: received metadata`);
    const info = getTorrentInfo(torrent);
    // dispatch(torrentMetaData(torrent.key, info));
    ipc.send('te-metadata', torrent.key, info);
    onProgress();
  }

  function onReady() {
    console.log(`Torrent#${torrent.key}: ready`);
    onProgress();
    // const info = getTorrentInfo(torrent);
    // dispatch(torrentReady(torrent.key, info));
  }

  function onDone() {
    console.log(`Torrent#${torrent.key}: done`);
    const info = getTorrentInfo(torrent);
    // dispatch(torrentDone(torrent.key, info));
    ipc.send('te-done', torrent.key, info);
    onProgress();
  }

  function onProgress() {
    const fileProg = torrent.files && torrent.files.map((file) => {
      const numPieces = (file._endPiece - file._startPiece) + 1;
      let numPiecesPresent = 0;
      for (let piece = file._startPiece; piece <= file._endPiece; piece++) {
        if (torrent.bitfield.get(piece)) numPiecesPresent++;
      }
      return {
        startPiece: file._startPiece,
        endPiece: file._endPiece,
        numPieces,
        numPiecesPresent,
        name: file.name
      };
    });
    const info = {
      ready: torrent.ready,
      progress: torrent.progress,
      downloaded: torrent.downloaded,
      downloadSpeed: torrent.downloadSpeed,
      uploadSpeed: torrent.uploadSpeed,
      numPeers: torrent.numPeers,
      length: torrent.length,
      // bitfield: torrent.bitfield,
      files: fileProg
    };
    // dispatch(torrentProgress(torrent.key, info));
    ipc.send('te-progress', torrent.key, info);
  }
}

function startStreamServer(torrentID) {
  console.log(`Stream Server: starting for torrent ${torrentID}`);
  const torrent = client.get(torrentID);

  const onReady = () => {
    if (server) return;

    server = torrent.createServer();
    server.listen(0, () => {
      const { port } = server.address();

      ipc.send('te-stream-server-started', {
        torrentKey: torrent.key,
        location: {
          local: `http://localhost:${port}`,
          network: `http://${networkAddress()}:${port}` // Useful for chromecast support
        }
      });

      console.log(`Stream Server: running at http://localhost:${port}`);
    });
  };

    // Wait for the torrent to be ready
  if (torrent.ready) onReady();
  else torrent.once('ready', () => onReady());
}

function selectFiles(torrentID, selections) {
  const torrent = client.get(torrentID);

  if (!torrent) {
    throw new Error(`
[TorrentEngine]: selectFiles: missing torrent: ${torrentID}, 
be sure this torrent was started already!
      `);
  }

  // Selections not specified?
  // Load all files. We still need to replace the default whole-torrent
  // selection with individual selections for each file, so we can
  // select/deselect files later on
  if (!selections) {
    selections = torrent.files.map(() => true);
  }

  // Selections specified incorrectly?
  if (selections.length !== torrent.files.length) {
    throw new Error(`
[TorrentEngine]: selectFiles: got ${selections.length} file selections, 
but the torrent contains ${torrent.files.length} files
      `);
  }

  // Remove default selection (whole torrent)
  torrent.deselect(0, torrent.pieces.length - 1, false);

  // Add selections (individual files)
  for (let i = 0; i < selections.length; i++) {
    const file = torrent.files[i];
    if (selections[i]) {
      file.select();
    } else {
      console.log(`[TorrentEngine]: selectFiles: deselecting file ${i} of torrent ${torrent.name}`);
      file.deselect();
    }
  }
}


function stopStreamServer() {
  if (!server) return;

  console.log('Stopping stream server.');

  server.destroy();
  server = null;
}


function getTorrentInfo(torrent) {
  return {
    infoHash: torrent.infoHash,
    magnetURI: torrent.magnetURI,
    name: torrent.name,
    path: torrent.path,
    files: torrent.files.map(getTorrentFileInfo),
    bytesReceived: torrent.received
  };
}

// Produces a JSON saveable summary of a file in a torrent
function getTorrentFileInfo(file) {
  return {
    name: file.name,
    length: file.length,
    path: file.path
  };
}

window.testOfflineMode = () => {
  console.log('Test, going OFFLINE');
  client = window.client = new WebTorrent({
    peerId: PEER_ID,
    tracker: false,
    dht: false,
    webSeeds: false
  });
  listenToClientEvents();
};
