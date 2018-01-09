import { createReducer } from '../util';
import { CHANGE_SETTINGS, RESET_SETTINGS } from '../actions/settings';
import { STORAGE_LOAD } from '../actions/storage';

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
  }
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
    }
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
