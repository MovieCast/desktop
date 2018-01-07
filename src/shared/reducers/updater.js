import { createReducer } from '../util';
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
  updateInfo: {
    version: '0.0.0',
    releaseName: 'failed_to_load',
    releaseNotes: 'failed_to_load'
  },
  updateAvailable: false,
  updateDownloading: 0,
  updateDownloaded: false,
  updateError: false,
  updateNotAvailable: false,
};

export default createReducer(initialState, {
  [CHECKING_FOR_UPDATE]: (state) => ({
    ...state,
    ...initialState,
    checkingForUpdate: true
  }),

  [UPDATE_AVAILABLE]: (state, action) => ({
    ...state,
    ...initialState,
    updateInfo: action.payload,
    updateAvailable: true
  }),

  [UPDATE_DOWNLOADING]: (state, action) => ({
    ...state,
    ...initialState,
    updateDownloading: action.payload
  }),

  [UPDATE_DOWNLOADED]: (state) => ({
    ...state,
    ...initialState,
    updateDownloaded: true
  }),

  [UPDATE_ERROR]: (state, action) => ({
    ...state,
    ...initialState,
    updateError: action.payload
  }),

  [UPDATE_NOT_AVAILABLE]: (state, action) => ({
    ...state,
    ...initialState,
    updateInfo: action.payload,
    updateNotAvailable: true
  })
});
