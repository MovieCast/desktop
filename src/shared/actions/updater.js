import { makeActionCreator } from '../util';

export const CHECKING_FOR_UPDATE = 'CHECKING_FOR_UPDATE';
export const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
export const UPDATE_NOT_AVAILABLE = 'UPDATE_NOT_AVAILABLE';
export const UPDATE_DOWNLOADING = 'UPDATE_DOWNLOADING';
export const UPDATE_DOWNLOADED = 'UPDATE_DOWNLOADED';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export function checkingForUpdate() {
  return {
    type: CHECKING_FOR_UPDATE
  };
}

export const updateAvailable = makeActionCreator(UPDATE_AVAILABLE, 'payload');
export const updateNotAvailable = makeActionCreator(UPDATE_NOT_AVAILABLE, 'payload');
export const updateDownloading = makeActionCreator(UPDATE_DOWNLOADING, 'payload');

export function updateDownloaded() {
  return {
    type: UPDATE_DOWNLOADED
  };
}

export function updateError(error) {
  return {
    type: UPDATE_ERROR,
    error: true,
    payload: error.message
  };
}
