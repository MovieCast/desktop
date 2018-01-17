import { createReducer } from '../util';
import { FETCH_MOVIE_SUCCESS, FETCH_MOVIE_REQUEST, FETCH_MOVIE_FAILURE } from '../actions/entities';

const initialState = {
  loading: true,
  error: true,
  torrent: null,
};

export default createReducer(initialState, {
  [FETCH_MOVIE_REQUEST]: (state) => ({
    ...state,
    loading: true
  }),

  [FETCH_MOVIE_SUCCESS]: (state) => ({
    ...state,
    loading: false
  }),

  [FETCH_MOVIE_FAILURE]: (state) => ({
    ...state,
    loading: false,
    error: true
  })
});
