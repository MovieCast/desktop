import _ from 'lodash';
import merge from 'deepmerge';
// import { fromJS } from 'immutable';
import { FETCH_MOVIE, FETCH_MOVIES, SET_FILTER } from '../actions/catalog';


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

export default function catalog(state = initialState, action) {
  switch (action.type) {
    // handle fetch movies action
    case FETCH_MOVIES:
      console.log(action.payload);
      return {
        ...state,
        entities: merge(state.entities, action.payload.entities),

        // de-dupe existing result, this does sometimes happen...
        result: _.union(state.result, action.payload.result)
      };
    case FETCH_MOVIE:
      console.warn('FETCH_MOVIE: This action is not working yet');
      return state;

    // Temp fix
    case 'RESET_RESULT':
      return {
        ...state,
        result: []
      };

    // handle set filter action
    case SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };

    // default return existing state
    default:
      return state;
  }
}
