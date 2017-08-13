import { createAliasedAction } from 'electron-redux';
import { getList, getMovie } from '../../main/api/movies';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';

export const fetchMovies = createAliasedAction(
  FETCH_MOVIES,
  ({ page, genre, sort }) => ({
    type: FETCH_MOVIES,
    payload: getList(page, genre, sort),
  })
);

export const fetchMovie = createAliasedAction(
  FETCH_MOVIE,
  (id) => ({
    type: FETCH_MOVIE,
    payload: getMovie(id),
  })
);
