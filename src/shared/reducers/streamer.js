import { createReducer } from '../util';

export const STREAMER_STARTING = 'STREAMER_STARTING';
export const STREAMER_STARTED = 'STREAMER_STARTED';
export const STREAMER_STOPPED = 'STREAMER_STOPPED';
export const STREAMER_SET_FILE = 'STREAMER_SET_FILE';
export const STREAMER_UPDATE_FILE = 'STREAMER_UPDATE_FILE';

export const STREAMER_TORRENT_UPDATE = 'STREAMER_TORRENT_UPDATE';

const initialState = {
  status: 'STOPPED',
  torrent: null,
  file: null,
  location: {}
};

export default createReducer(initialState, {
  [STREAMER_STARTING]: (state) => ({
    ...state,
    status: 'STARTING'
  }),

  [STREAMER_STARTED]: (state, action) => ({
    ...state,
    status: 'STARTED',
    ...action.payload
  }),

  [STREAMER_STOPPED]: (state) => ({
    ...state,
    ...initialState
  }),

  [STREAMER_SET_FILE]: (state, action) => ({
    ...state,
    file: action.payload
  }),

  [STREAMER_UPDATE_FILE]: (state, action) => ({
    ...state,
    file: { ...state.file, ...action.payload }
  }),

  [STREAMER_TORRENT_UPDATE]: (state, action) => ({
    ...state,
    torrent: { ...state.torrent, ...action.payload }
  })
});
