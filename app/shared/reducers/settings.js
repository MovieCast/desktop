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

export default function settings(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SETTINGS:
      return {
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
      };

    case RESET_SETTINGS:
      return {
        ...state,
        ...initialState
      };

    default:
      return state;
  }
}
