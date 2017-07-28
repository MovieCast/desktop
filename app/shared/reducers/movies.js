import _ from 'lodash';
import { FETCH_MOVIE, FETCH_MOVIES } from '../actions/items';

export default function movies(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return { ...state, [action.payload.data.data.movie.id]: action.payload.data.data.movie };
    case FETCH_MOVIES:
      return _.mapKeys(action.payload.data.data.movies, 'id');
    default:
      return state;
  }
}
