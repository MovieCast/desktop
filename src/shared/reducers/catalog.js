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
  result: []
};

export default createReducer(initialState, {
  [FETCH_MOVIES_SUCCESS]: (state, { payload }) => ({
    ...state,
    // entities: merge(state.entities, action.payload.entities),
    // ...action.payload.entities

    // de-dupe existing result, this does sometimes happen...
    result: _.union(state.result, payload.result),
    moreAvailable: payload.result.length > 0
  }),


  // [FETCH_MOVIE_SUCCESS]: (state, action) => {
  //   // console.warn('FETCH_MOVIE_SUCCESS: Unhandled process!');
  //   console.log(action.payload);
  //   return {
  //     ...state,
  //     entities: merge(state.entities, { [action.payload.data._id]: action.payload.data })
  //     // entities: {
  //     //   ...state.entities,
  //     //   movies: {
  //     //     ...state.entities.movies,
  //     //     [action.payload.data._id]: action.data.payload
  //     //     // [action.payload._id]: {
  //     //     //   ...state.entities[action.payload._id]
  //     //     // }
  //     //   }
  //     // }
  //   };
  // },

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
