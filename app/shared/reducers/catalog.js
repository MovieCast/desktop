import _ from 'lodash';
import { FETCH_MOVIE, FETCH_MOVIES } from '../actions/catalog';

const initialState = {
  page: 1,
  genre: 'all',
  sort: 'year',
  items: {}
};

export default function catalog(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.data.data.movie.id]: action.payload.data.data.movie
        }
      };
    case FETCH_MOVIES:
      return {
        ...state,
        page: action.payload.config.params.page,
        genre: action.payload.config.params.genre,
        sort: action.payload.config.params.sort_by,
        items: {
          ...state.items,
          ..._.mapKeys(action.payload.data.data.movies, 'id')
        }
      };
    default:
      return state;
  }
}
