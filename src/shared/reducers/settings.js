import { createReducer } from '../util';
import { CHANGE_SETTINGS, RESET_SETTINGS } from '../actions/settings';
import { STORAGE_LOAD } from '../actions/storage';
import { DEFAULT_DOWNLOAD_PATH } from '../../config';

const initialState = {
  ui: {
    language: 'en',
    palette: 'dark',
    startScreen: 'movies',
  },
  subtitles: {
    language: 'en',
    size: '24px'
  },
  quality: {
    showOnList: true
  },
  downloadLocation: DEFAULT_DOWNLOAD_PATH
};

export default createReducer(initialState, {
  [CHANGE_SETTINGS]: (state, action) => ({
    ...state,
    ui: {
      ...state.ui,
      ...action.payload.ui
    },
    subtitles: {
      ...state.subtitles,
      ...action.payload.subtitles
    },
    quality: {
      ...state.quality,
      ...action.payload.quality
    },
    downloadLocation: action.payload.downloadLocation
  }),

  [RESET_SETTINGS]: (state) => ({
    ...state,
    ...initialState
  }),

  [STORAGE_LOAD]: (state, action) => ({
    ...state,
    ...action.payload.settings
  })
});
