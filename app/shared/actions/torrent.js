import { createAliasedAction } from 'electron-redux';

export const TORRENT_WARNING = 'TORRENT_WARNING';
export const TORRENT_ERROR = 'TORRENT_ERROR';
export const TORRENT_ADD = 'TORRENT_ADD';
export const TORRENT_UPDATE = 'TORRENT_UPDATE';
export const TORRENT_REMOVE = 'TORRENT_REMOVE';

export const Status = {
  NEW: 'NEW',
  PAUSED: 'PAUSED',
  DOWNLOADING: 'DOWNLOADING',
  SEEDING: 'SEEDING'
};

export function torrentInfoHash(torrentKey, infoHash) {
  return (dispatch, getState) => {
    let torrentSummary = getTorrentSummary(getState(), torrentKey);

    if (!torrentSummary) {
      torrentSummary = {
        key: torrentKey,
        status: Status.NEW,
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
        status: Status.DOWNLOADING,
        ...torrentInfo
      }
    });
  };
}

export function torrentDone(torrentKey, torrentInfo) {
  return (dispatch, getState) => {
    const torrentSummary = getTorrentSummary(getState(), torrentKey);

    dispatch({
      type: TORRENT_UPDATE,
      payload: {
        ...torrentSummary,
        status: Status.SEEDING,
        ...torrentInfo
      }
    });
  };
}

export const addTorrent = createAliasedAction(
  TORRENT_ADD,
  (torrentKey, torrentID, path, fileModtimes, selections) => {
    global.torrentEngine.startTorrenting(torrentKey, torrentID, path, fileModtimes, selections);
    return {
      type: TORRENT_ADD
    };
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

function getTorrentSummary(state, key) {
  return state.torrent.torrents[key];
}
