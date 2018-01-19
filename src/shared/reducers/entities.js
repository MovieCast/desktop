import merge from 'deepmerge';

import { createReducer } from '../util';
import { FETCH_MOVIES_SUCCESS, FETCH_MOVIE_SUCCESS } from '../actions/entities';

const initialState = {
  movies: {}
};

export default createReducer(initialState, {
  [FETCH_MOVIES_SUCCESS]: (state, { payload }) => {
    if (!payload.entities.movies) return state;

    return {
      ...state,
      movies: merge(state.movies, payload.entities.movies)
    };
  },

  [FETCH_MOVIE_SUCCESS]: (state, { payload }) => ({
    ...state,
    movies: merge(state.movies, payload.entities.movies)
  })
});
