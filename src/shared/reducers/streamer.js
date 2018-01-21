import { createReducer } from '../util';

export const STREAMER_STARTED = 'STREAMER_STARTED';
export const STREAMER_STOPPED = 'STREAMER_STOPPED';
export const SET_STREAMER_TORRENT = 'SET_STREAMER_TORRENT';

const initialState = {
  status: 'STOPPED',
  torrent: null
};

export default createReducer(initialState, {
  [STREAMER_STARTED]: (state) => ({
    ...state,
    status: 'STARTED'
  }),

  [STREAMER_STOPPED]: (state) => ({
    ...state,
    status: 'STOPPED'
  }),

  [SET_STREAMER_TORRENT]: (state, action) => ({
    ...state,
    torrent: action.payload
  })
});
