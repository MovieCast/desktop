import _ from 'lodash';
import { createReducer } from '../util';
import { FETCH_MOVIES_SUCCESS, SET_FILTER } from '../actions/catalog';


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

    // de-dupe existing result, this does sometimes happen...
    result: _.union(state.result, payload.result),
    moreAvailable: payload.result.length > 0
  }),

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
