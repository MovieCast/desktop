import {
  CHECKING_FOR_UPDATE,
  UPDATE_AVAILABLE,
  UPDATE_DOWNLOADING,
  UPDATE_DOWNLOADED,
  UPDATE_ERROR,
  UPDATE_NOT_AVAILABLE,
 } from '../actions/updater';

const initialState = {
  checkingForUpdate: false,
  updateAvailable: false,
  updateDownloading: 0,
  updateDownloaded: false,
  updateError: false,
  updateNotAvailable: false,
};

export default function updater(state = initialState, action) {
  switch (action.type) {
    case CHECKING_FOR_UPDATE: {
      return {
        ...state,
        ...initialState,
        checkingForUpdate: true
      };
    }

    case UPDATE_AVAILABLE: {
      return {
        ...state,
        ...initialState,
        updateAvailable: true
      };
    }

    case UPDATE_DOWNLOADING: {
      return {
        ...state,
        ...initialState,
        updateDownloading: action.payload
      };
    }

    case UPDATE_DOWNLOADED: {
      return {
        ...state,
        ...initialState,
        updateDownloaded: true
      };
    }

    case UPDATE_ERROR: {
      return {
        ...state,
        ...initialState,
        updateError: action.payload
      };
    }

    case UPDATE_NOT_AVAILABLE: {
      return {
        ...state,
        ...initialState,
        updateNotAvailable: true
      };
    }

    default:
      return state;
  }
}
