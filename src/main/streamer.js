import crypto from 'crypto';
import { announceList } from 'create-torrent';
import WebTorrent from 'webtorrent';
import zeroFill from 'zero-fill';

import * as logger from './logger';
import pkg from '../package.json';
import { STREAMER_STOPPED, STREAMER_STARTED } from '../shared/reducers/streamer';

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
  }

  async start(torrentInfo) {
    // We will currently only support one torrent at a time.
    if (this.client) {
      this.stop();
    }

    const torrent = await this.resolveTorrent(torrentInfo);
    console.log(torrent);

    this.store.dispatch({ type: STREAMER_STARTED });
    logger.info('Streamer started');
  }

  stop() {
    if (this.client) {
      this.client.destroy();
    }

    // TODO: Reset player meta here
    // store.dispatch({type: PLAYER_RESET });

    this.client = null;
    this.torrent = null;
    this.state = null;
    this.streamInfo = null;

    this.store.dispatch({ type: STREAMER_STOPPED });
    logger.info('Streamer stopped');
  }

  /**
   * Resolves a torrent based on torrent information
   * This can either be a magnet/hash
   * or an object with a magnet/hash
   *
   * @param {string|Object} torrentInfo - The torrent info
   */
  async resolveTorrent(torrentInfo) {
    // This will always make sure we are using the last client
    const client = this.getInstance();
    const state = this.store.getState();

    const uri = torrentInfo.magnet || torrentInfo.hash || torrentInfo;

    const torrent = client.add(uri, {
      path: state.settings.downloadLocation
    });

    client.on('error', (err) => {
      logger.error('Streamer error: ', err);
      this.stop();
      throw err;
    });

    return torrent.on('metadata', () => torrent);
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
