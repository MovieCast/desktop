import { createReducer } from '../util';
import {
  TOGGLE_PLAY,
  SET_URL,
  SET_TITLE,
  UPDATE_VOLUME,
  UPDATE_PLAYBACK_RATE,
  UPDATE_DURATION,
  UPDATE_CURRENT_TIME,
  UPDATE_TRACKS,
  TOGGLE_FULLSCREEN,
  TOGGLE_UI,
  SET_BUFFERING,
  PLAYER_VIEW_UNLOADED
} from '../actions/player';

const initialState = {
  playing: false,
  buffering: true,
  src: 'http://vjs.zencdn.net/v/oceans.mp4',
  title: 'No Title',
  volume: 0.8,
  playbackRate: 1,
  duration: 0,
  currentTime: 0,
  // progressFrequency: 1000,
  tracks: [],

  // Move these to application reducer later!
  fullscreen: false,
  showUi: true
};

export default createReducer(initialState, {
  [PLAYER_VIEW_UNLOADED]: () => ({
    ...initialState
  }),

  [SET_URL]: (state, action) => ({
    ...state,
    src: action.payload
  }),
  [SET_TITLE]: (state, action) => ({
    ...state,
    title: action.payload
  }),
  [SET_BUFFERING]: (state, action) => ({
    ...state,
    buffering: action.payload
  }),

  [UPDATE_VOLUME]: (state, action) => ({
    ...state,
    volume: action.payload
  }),
  [UPDATE_PLAYBACK_RATE]: (state, action) => ({
    ...state,
    playbackRate: action.payload
  }),
  [UPDATE_DURATION]: (state, action) => ({
    ...state,
    duration: action.payload
  }),
  [UPDATE_CURRENT_TIME]: (state, action) => ({
    ...state,
    currentTime: action.payload
  }),
  [UPDATE_TRACKS]: (state, action) => ({
    ...state,
    tracks: action.payload
  }),

  [TOGGLE_PLAY]: (state, action) => ({
    ...state,
    playing: action.payload ? action.payload : !state.playing
  }),
  [TOGGLE_FULLSCREEN]: (state) => ({
    ...state,
    fullscreen: !state.fullscreen
  }),
  [TOGGLE_UI]: (state, action) => ({
    ...state,
    showUi: action.payload ? action.payload : !state.showUi
  })
});
