import _ from 'lodash';
import merge from 'deepmerge';
import { createReducer } from '../util';
// import { fromJS } from 'immutable';
import { FETCH_MOVIE_SUCCESS, FETCH_MOVIES_SUCCESS, SET_FILTER } from '../actions/catalog';


const initialState = {
  filter: {
    page: 1,
    genre: 'all',
    sort: 'trending',
    keywords: ''
  },
  moreAvailable: true,
  entities: {
    movies: [],
    torrents: []
  },
  result: []
};

export default createReducer(initialState, {
  [FETCH_MOVIES_SUCCESS]: (state, action) => ({
    ...state,
    entities: merge(state.entities, action.payload.entities),

    // de-dupe existing result, this does sometimes happen...
    result: _.union(state.result, action.payload.result),
    moreAvailable: action.payload.result.length > 0
  }),


  [FETCH_MOVIE_SUCCESS]: (state) => {
    console.warn('FETCH_MOVIE_SUCCESS: Unhandled process!');
    return state;
  },

  // Temp fix
  RESET_RESULT: (state) => ({
    ...state,
    result: []
  }),

  // handle set filter action
  [SET_FILTER]: (state, action) => ({
    ...state,
    filter: {
      ...state.filter,
      ...action.payload
    }
  })
});
