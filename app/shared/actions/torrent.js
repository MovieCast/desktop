import { createAliasedAction } from 'electron-redux';
import {
  getTorrentSummary
} from '../helpers/torrent';

export const TORRENT_WARNING = 'TORRENT_WARNING';
export const TORRENT_ERROR = 'TORRENT_ERROR';
export const TORRENT_ADD = 'TORRENT_ADD';
export const TORRENT_UPDATE = 'TORRENT_UPDATE';
export const TORRENT_REMOVE = 'TORRENT_REMOVE';

export const STREAM_SERVER_START = 'STREAM_SERVER_START';
export const STREAM_SERVER_STARTED = 'STREAM_SERVER_STARTED';
export const STREAM_SERVER_STOP = 'STREAM_SERVER_STOP';

export const TorrentStatus = {
  NEW: 'NEW',
  PAUSED: 'PAUSED',
  DOWNLOADING: 'DOWNLOADING',
  SEEDING: 'SEEDING'
};

export const ServerStatus = {
  STOPPED: 'STOPPED',
  STARTING: 'STARTING',
  STARTED: 'STARTED'
};

export function torrentInfoHash(torrentKey, infoHash) {
  return (dispatch, getState) => {
    let torrentSummary = getTorrentSummary(getState(), torrentKey);

    if (!torrentSummary) {
      torrentSummary = {
        key: torrentKey,
        status: TorrentStatus.NEW,
      };
    }

    torrentSummary.infoHash = infoHash;

    dispatch({
      type: TORRENT_UPDATE,
      payload: torrentSummary
    });
  };
}

export function torrentMetaData(torrentKey, torrentInfo) {
  return (dispatch, getState) => {
    const torrentSummary = getTorrentSummary(getState(), torrentKey);

    dispatch({
      type: TORRENT_UPDATE,
      payload: {
        ...torrentSummary,
        status: TorrentStatus.DOWNLOADING,
        ...torrentInfo
      }
    });
  };
}

export function torrentProgress(torrentKey, torrentInfo) {
  return (dispatch, getState) => {
    const torrentSummary = getTorrentSummary(getState(), torrentKey);

    if (torrentSummary.progress !== torrentInfo.progress) {
      dispatch({
        type: TORRENT_UPDATE,
        payload: {
          ...torrentSummary,
          ...torrentInfo
        }
      });
    }
  };
}

export function torrentDone(torrentKey, torrentInfo) {
  return (dispatch, getState) => {
    const torrentSummary = getTorrentSummary(getState(), torrentKey);

    dispatch({
      type: TORRENT_UPDATE,
      payload: {
        ...torrentSummary,
        status: TorrentStatus.SEEDING,
        ...torrentInfo
      }
    });
  };
}

export function streamServerStarted(info) {
  return {
    type: STREAM_SERVER_STARTED,
    payload: {
      status: ServerStatus.STARTED,
      ...info
    }
  };
}

export const startStreamServer = createAliasedAction(
  STREAM_SERVER_START,
  (torrentKey) => (dispatch, getState) => {
    const torrentSummary = getTorrentSummary(getState(), torrentKey);
    global.torrentEngine.startStreamServer(torrentSummary.infoHash);
    return {
      type: STREAM_SERVER_START,
      payload: ServerStatus.STARTING
    };
  }
);

export const stopStreamServer = createAliasedAction(
  STREAM_SERVER_STOP,
  () => {
    global.torrentEngine.stopStreamServer();
    return {
      type: STREAM_SERVER_STOP,
      payload: ServerStatus.STOPPED
    };
  }
);

export const addTorrent = createAliasedAction(
  TORRENT_ADD,
  (torrentID) => (dispatch, getState) => {
    const { torrent } = getState();
    const torrentKey = torrent.nextKey;
    const path = null; // TODO: Make a helper to calculate the path

    // TODO: TorrentEngine.onMetadata -> process selections.
    global.torrentEngine.startTorrenting(torrentKey, torrentID, path);

    dispatch({
      type: TORRENT_ADD
    });
  }
);

export const removeTorrent = createAliasedAction(
  TORRENT_REMOVE,
  (torrentKey) => (dispatch, getState) => {
    const torrentSummary = getTorrentSummary(getState(), torrentKey);
    global.torrentEngine.stopTorrenting(torrentSummary.infoHash);
    dispatch({
      type: TORRENT_REMOVE,
      payload: torrentKey
    });
  }
);

export function torrentWarning(err) {
  return {
    type: TORRENT_WARNING,
    payload: err.message
  };
}

export function torrentError(err) {
  return {
    type: TORRENT_ERROR,
    payload: err.message
  };
}
