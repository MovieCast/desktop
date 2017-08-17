export const TORRENT_ENGINE_WARNING = 'TORRENT_ENGINE_WARNING';
export const TORRENT_ENGINE_ERROR = 'TORRENT_ENGINE_ERROR';

export function torrentEngineWarning(err) {
  return {
    type: TORRENT_ENGINE_WARNING,
    payload: err.message
  };
}

export function torrentEngineError(err) {
  return {
    type: TORRENT_ENGINE_ERROR,
    payload: err.message
  };
}
