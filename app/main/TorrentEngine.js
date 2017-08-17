/* eslint-disable no-param-reassign, no-plusplus */
import crypto from 'crypto';
import WebTorrent from 'webtorrent';
import zeroFill from 'zero-fill';
import pkg from '../package.json';
import {
  torrentWarning,
  torrentError,
  torrentInfoHash,
  torrentMetaData,
  torrentDone
} from '../shared/actions/torrent';

/**
 * Manager for WebTorrent
 *
 * A lot of the code here is inspired
 * by WebTorrent Desktop
 */
class TorrentEngine {

  /**
   * MovieCast Version
   */
  static VERSION = pkg.version;

  /**
   * Version number in Azureus-style. Generated from major and minor semver version.
   * For example:
   *   '0.0.1' -> '0000'
   *   '0.1.0' -> '0001'
   *   '1.1.0' -> '0101'
   */
  static VERSION_STR = TorrentEngine.VERSION.match(/([0-9]+)/g)
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
  static VERSION_PREFIX = `-MC${TorrentEngine.VERSION_STR}-`;

  /**
   * Generate an ephemeral peer ID each time.
   */
  static PEER_ID = Buffer.from(TorrentEngine.VERSION_PREFIX + crypto.randomBytes(9).toString('base64'))

  constructor(store) {
    // The Redux store
    this.store = store;

    // Connect to the WebTorrent and BitTorrent networks.
    // MovieCast is just like WebTorrent Desktop a hybrid
    // client, as explained here: https://webtorrent.io/faq
    this.client = new WebTorrent({ peerId: TorrentEngine.PEER_ID });

    // WebTorrent-to-HTTP streaming sever
    this.server = null;

    // Connect the store with the client
    this.connectClientEventsToStore();
  }

  /**
   * Pass client events to the Redux store
   */
  connectClientEventsToStore() {
    const { dispatch } = this.store;

    this.client.on('warning', err => dispatch(torrentWarning(err)));

    this.client.on('error', err => dispatch(torrentError(err)));
  }

  startTorrenting(torrentKey, torrentID, path, fileModtimes, selections) {
    console.log(`[TorrentEngine]: Starting torrent ${torrentID}`);

    const torrent = this.client.add(torrentID, {
      // path,
      fileModtimes
    });

    torrent.key = torrentKey;

    this.addTorrentEvents(torrent);

    // If we only select certain files don't download the others
    torrent.on('ready', () => this.selectFiles(torrent, selections));
  }

  stopTorrenting(torrentID) {
    console.log(`[TorrentEngine]: Stoping torrent ${torrentID}`);

    const torrent = this.client.get(torrentID);
    if (torrent) torrent.destroy();
  }

  addTorrentEvents(torrent) {
    const { dispatch } = this.store;
    torrent.on('warning', err => dispatch(torrentWarning(err)));
    torrent.on('error', err => dispatch(torrentError(err)));
    torrent.on('infoHash', onInfoHash);
    torrent.on('metadata', onMetadata);
    torrent.on('ready', onReady);
    torrent.on('done', onDone);

    function onInfoHash() {
      console.log(`[TorrentEngine]: Torrent#${torrent.key}: received infohash: ${torrent.infoHash}`);
      dispatch(torrentInfoHash(torrent.key, torrent.infoHash));
    }

    function onMetadata() {
      console.log(`[TorrentEngine]: Torrent#${torrent.key}: received metadata`);
      const info = getTorrentInfo(torrent);
      dispatch(torrentMetaData(torrent.key, info));
    }

    function onReady() {
      console.log(`[TorrentEngine]: Torrent#${torrent.key}: ready`);
      // const info = getTorrentInfo(torrent);
      // dispatch(torrentReady(torrent.key, info));
    }

    function onDone() {
      console.log(`[TorrentEngine]: Torrent#${torrent.key}: done`);
      const info = getTorrentInfo(torrent);
      dispatch(torrentDone(torrent.key, info));
    }
  }


  selectFiles(torrentID, selections) {
    const torrent = this.client.get(torrentID);

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

export default TorrentEngine;
