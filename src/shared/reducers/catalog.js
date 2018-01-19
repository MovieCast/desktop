import _ from 'lodash';
import { createReducer } from '../util';
import { SET_FILTER, CATALOG_VIEW_UNLOADED } from '../actions/catalog';
import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE } from '../actions/entities';


const initialState = {
  loading: true,
  filter: {
    page: 1,
    genre: 'all',
    sort: 'trending',
    keywords: ''
  },
  moreAvailable: false,
  result: []
};

export default createReducer(initialState, {
  [CATALOG_VIEW_UNLOADED]: (state) => ({
    ...state,
    loading: true
  }),

  [FETCH_MOVIES_SUCCESS]: (state, { payload }) => {
    const newState = {
      ...state,
      loading: false,
      moreAvailable: payload.result.length > 0
    };

    if (state.filter.page === 1) {
      newState.result = payload.result;
    } else {
      newState.result = _.union(state.result, payload.result);
    }

    return newState;
  },

  [FETCH_MOVIES_FAILURE]: (state) => ({
    ...state,
    loading: false,
    moreAvailable: false
  }),

  // Temp fix
  RESET_RESULT: (state) => ({
    ...state,
    moreAvailable: false,
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
