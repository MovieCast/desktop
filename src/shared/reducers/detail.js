import { createReducer } from '../util';
import { FETCH_MOVIE_SUCCESS, FETCH_MOVIE_REQUEST } from '../actions/entities';

const initialState = {
  loading: true
};

export default createReducer(initialState, {
  [FETCH_MOVIE_REQUEST]: (state) => ({
    ...state,
    loading: true
  }),

  [FETCH_MOVIE_SUCCESS]: (state) => ({
    ...state,
    loading: false
  })
});
