import { remote } from 'electron';

export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const SET_URL = 'SET_URL';
export const UPDATE_VOLUME = 'CHANGE_VOLUME';
export const UPDATE_PLAYBACK_RATE = 'CHANGE_PLAYBACK_RATE';
export const UPDATE_DURATION = 'UPDATE_DURATION';
export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME';
export const UPDATE_TRACKS = 'UPDATE_TRACKS';
export const TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN';
export const TOGGLE_UI = 'TOGGLE_UI';

export function togglePlay(force) {
  return {
    type: TOGGLE_PLAY,
    payload: force
  };
}

export function setUrl(url) {
  return {
    type: SET_URL,
    payload: url
  };
}

export function updateVolume(volume) {
  return {
    type: UPDATE_VOLUME,
    payload: volume
  };
}

export function updatePlaybackRate(rate) {
  return {
    type: UPDATE_PLAYBACK_RATE,
    payload: rate
  };
}

export function updateDuration(duration) {
  return {
    type: UPDATE_DURATION,
    payload: duration
  };
}

export function updateCurrentTime(currentTime) {
  return {
    type: UPDATE_CURRENT_TIME,
    payload: currentTime
  };
}

export function updateTracks(tracks) {
  return {
    type: UPDATE_TRACKS,
    payload: tracks
  };
}

export function toggleFullscreen() {
  console.warn('toggleFullscreen: to be moved to application reducer!');

  const window = remote.getCurrentWindow();
  const negativeFS = !window.isFullScreen();

  window.setFullScreen(negativeFS);

  return {
    type: TOGGLE_FULLSCREEN,
    payload: negativeFS
  };
}

export function toggleUi(force) {
  console.warn('toggleUi: to be moved to application reducer!');
  return {
    type: TOGGLE_UI,
    payload: force
  };
}
