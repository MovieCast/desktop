/* eslint-disable class-methods-use-this */

import path from 'path';
import crypto from 'crypto';
import { announceList } from 'create-torrent';
import WebTorrent from 'webtorrent';
import networkAddress from 'network-address';
import zeroFill from 'zero-fill';

import * as logger from './logger';
import pkg from '../package.json';
import { STREAMER_STOPPED, STREAMER_STARTED, STREAMER_SET_FILE, STREAMER_TORRENT_UPDATE, STREAMER_STARTING } from '../shared/reducers/streamer';

export default class Streamer {
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
  static VERSION_STR = Streamer.VERSION.match(/([0-9]+)/g)
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
  static VERSION_PREFIX = `-MC${Streamer.VERSION_STR}-`;

  /**
   * Generate an ephemeral peer ID each time.
   */
  static PEER_ID = Buffer.from(Streamer.VERSION_PREFIX + crypto.randomBytes(9).toString('base64'))

  constructor(store) {
    this.store = store;

    this.client = null;
    this.torrent = null;
    this.server = null;
  }

  start(torrentInfo) {
    // We will currently only support one torrent at a time.
    if (this.client) {
      this.stop();
    }

    this.store.dispatch({ type: STREAMER_STARTING });

    this.resolveTorrent(torrentInfo).then(torrent => {
      this.torrent = torrent;
      this.addTorrentEvents();

      this.torrent.once('metadata', () => this.selectFile());
      this.torrent.once('ready', async () => {
        await this.createServer();
        logger.info('Streamer started');
      });

      return torrent;
    }).catch(err => {
      logger.error('A fatal error occured', err);
      this.stop();
    });
  }

  async stop() {
    if (this.server) {
      // this.server.destroy();
    }

    if (this.torrent) {
      clearInterval(this.torrent.progressInterval);
      // this.torrent.destroy();
    }

    if (this.client) {
      this.client.destroy();
    }

    // Cleanup
    this.client = null;
    this.torrent = null;
    this.server = null;

    this.store.dispatch({ type: STREAMER_STOPPED });
    logger.info('Streamer stopped');
  }

  selectFile(index) {
    // Remove default selection (whole torrent)
    this.torrent.deselect(0, this.torrent.pieces.length - 1, false);
    logger.debug('Deselected all files of torrent');

    let fileSize = 0;
    let fileIndex = index;

    // Ugh noone told us the fileIndex yet,
    // let's find the biggest supported file.
    if (!fileIndex) {
      logger.debug('Ugh noone told us the fileIndex yet, calculating...');
      for (let i = 0; i < this.torrent.files.length; i += 1) {
        if (fileSize < this.torrent.files[i].length) {
          fileSize = this.torrent.files[i].length;
          fileIndex = i;
        }
      }
    } else {
      fileSize = this.torrent.files[fileIndex].length;
    }
    logger.debug('Got fileSize and fileIndex', fileSize, fileIndex);

    // Add selections (individual files)
    for (let y = 0; y < this.torrent.files.length; y += 1) {
      const file = this.torrent.files[y];
      if (y === fileIndex) {
        logger.debug('Selected wanted file: ', file);
        file.select();
      }
      // Yea this part isn't needed now...
      // } else {
      //   logger.debug('Yow boi, deselected a file', file);
      //   file.deselect();
      // }
    }

    const selectedFile = this.torrent.files[fileIndex];

    this.store.dispatch({
      type: STREAMER_SET_FILE,
      payload: {
        index: fileIndex,
        name: path.basename(selectedFile.path),
        path: path.join(this.torrent.path, selectedFile.path),
        size: fileSize
      }
    });
  }

  addTorrentEvents() {
    this.torrent.once('infoHash', () => {
      logger.debug(`Torrent#${this.torrent.infoHash}: onInfoHash`);
      this.store.dispatch({
        type: STREAMER_TORRENT_UPDATE,
        payload: {
          status: 'NEW',
          ready: this.torrent.ready,
          infoHash: this.torrent.infoHash
        }
      });
    });

    this.torrent.once('metadata', () => {
      logger.debug(`Torrent#${this.torrent.infoHash}: onMetadata`);
      this.store.dispatch({
        type: STREAMER_TORRENT_UPDATE,
        payload: {
          status: 'DOWNLOADING',
          name: this.torrent.name,
          path: this.torrent.path,
          bytesReceived: this.torrent.received
        }
      });
    });

    this.torrent.once('ready', () => {
      logger.debug(`Torrent#${this.torrent.infoHash}: onReady`);
      this.store.dispatch({
        type: STREAMER_TORRENT_UPDATE,
        payload: {
          ready: this.torrent.ready
        }
      });
    });

    this.torrent.once('done', () => {
      logger.debug(`Torrent#${this.torrent.infoHash}: onDone`);
      this.store.dispatch({
        type: STREAMER_TORRENT_UPDATE,
        payload: {
          status: 'SEEDING'
        }
      });
    });

    this.torrent.progressInterval = setInterval(updateProgress.bind(this), 1000);

    function updateProgress() {
      const { streamer: { file } } = this.store.getState();

      // Gotta fix srr
      if (file) {
        const downloaded = this.torrent.files[file.index].downloaded;
        let progress = (downloaded / file.size) * 100;
        if (progress > 100) {
          progress = 100;
        }

        let eta = Math.round((file.size - downloaded) / this.torrent.downloadSpeed);
        if (eta < 0) {
          eta = 0;
        }

        this.store.dispatch({
          type: STREAMER_TORRENT_UPDATE,
          payload: {
            peers: this.torrent.numPeers,
            progress,
            downloaded,
            eta,
            downloadSpeed: this.torrent.downloadSpeed,
            uploadSpeed: this.torrent.uploadSpeed
          }
        });
      }
    }
  }

  /**
   * Creates a stream server for the given torrent
   * @param {Object} torrent - The torrent
   * @param {number} port - The stream port
   */
  createServer(port) {
    return new Promise((resolve, reject) => {
      const { settings, streamer } = this.store.getState();

      const serverPort = parseInt((port || settings.streamPort || 0), 10);

      try {
        const server = this.torrent.createServer();
        server.listen(serverPort, () => {
          const suffix = `:${server.address().port}/${streamer.file.index}`;

          this.store.dispatch({
            type: STREAMER_STARTED,
            payload: {
              location: {
                local: `http://localhost${suffix}`,
                network: `https://${networkAddress()}${suffix}`
              }
            }
          });

          logger.debug(`Server server running at http://localhost:${server.address().port}`);
          resolve(server);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Resolves a torrent based on torrent information
   * This can either be a magnet/hash
   * or an object with a magnet/hash
   *
   * @param {string|Object} torrentInfo - The torrent info
   */
  async resolveTorrent(torrentInfo) {
    // return new Promise((resolve, reject) => {
    // This will always make sure we are using the last client
    const client = this.getInstance();
    const state = this.store.getState();

    const uri = torrentInfo.magnet || torrentInfo.hash || torrentInfo;

    client.once('error', (err) => {
      logger.error('Streamer error: ', err);
      this.stop();
      throw err;
    });

    return client.add(uri, {
      path: state.settings.downloadLocation
    });
  }

  /**
   * Get the current webtorrent instance,
   * will also set the global client variable
   * @return {WebTorrent}
   */
  getInstance() {
    if (this.client === null) {
      const announce = announceList
        .map((arr) => arr[0])
        .filter((url) => url.indexOf('wss://') === 0 || url.indexOf('ws://') === 0);

      this.client = new WebTorrent({
        peerId: Streamer.PEER_ID,
        tracker: { announce }
      });
    }
    return this.client;
  }
}
