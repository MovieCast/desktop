import _ from 'lodash';
import merge from 'deepmerge';
import { createReducer } from '../util';
// import { fromJS } from 'immutable';
import { FETCH_MOVIE, FETCH_MOVIES_SUCCESS, SET_FILTER } from '../actions/catalog';


const initialState = {
  filter: {
    page: 1,
    genre: 'all',
    sort: 'trending'
  },
  entities: {
    movies: []
  },
  result: []
};

export default createReducer(initialState, {
  [FETCH_MOVIES_SUCCESS]: (state, action) => ({
    ...state,
    entities: merge(state.entities, action.payload.entities),

    // de-dupe existing result, this does sometimes happen...
    result: _.union(state.result, action.payload.result)
  }),


  [FETCH_MOVIE]: (state) => {
    console.warn('FETCH_MOVIE: This action is not working yet');
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
