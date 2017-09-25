import { createReducer } from '../util';
import { CHANGE_SETTINGS, RESET_SETTINGS } from '../actions/settings';

const initialState = {
  ui: {
    language: 'English',
    palette: 'Dark',
    startScreen: 'Movies',
  },
  subtitles: {
    language: 'English',
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
  })
});
