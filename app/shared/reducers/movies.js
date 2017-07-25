import _ from 'lodash';
import { FETCH_MOVIE, FETCH_MOVIES } from '../actions/items';

export default function movies(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_MOVIES:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
