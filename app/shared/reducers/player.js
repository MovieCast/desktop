import {
  TOGGLE_PLAY,
  SET_URL,
  UPDATE_VOLUME,
  UPDATE_PLAYBACK_RATE,
  UPDATE_DURATION,
  UPDATE_CURRENT_TIME,
  UPDATE_TRACKS,
  TOGGLE_FULLSCREEN,
  TOGGLE_UI
} from '../actions/player';

const initialState = {
  playing: false,
  src: 'http://vjs.zencdn.net/v/oceans.mp4',
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

export default function player(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return {
        ...state,
        playing: action.payload ? action.payload : !state.playing
      };
    case SET_URL:
      return {
        ...state,
        src: action.payload
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        volume: action.payload
      };
    case UPDATE_PLAYBACK_RATE:
      return {
        ...state,
        playbackRate: action.payload
      };
    case UPDATE_DURATION:
      return {
        ...state,
        duration: action.payload
      };
    case UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload
      };
    case UPDATE_TRACKS:
      return {
        ...state,
        tracks: action.payload
      };
    case TOGGLE_FULLSCREEN:
      return {
        ...state,
        fullscreen: !state.fullscreen
      };
    case TOGGLE_UI:
      return {
        ...state,
        showUi: action.payload ? action.payload : !state.showUi
      };
    default:
      return state;
  }
}
