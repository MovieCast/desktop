// import axios from 'axios';
import faker from 'faker'; // Remove me later ples...
import { createAliasedAction } from 'electron-redux';

import { getList, getMovie } from '../../main/api/movies';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';

/* TODO: fetchMovieByPage(page) */

export const fetchMovies = createAliasedAction(
  FETCH_MOVIES,
  () => ({
    type: FETCH_MOVIES,
    payload: getList(),
  })
);

export const fetchMovie = createAliasedAction(
  FETCH_MOVIE,
  (id) => ({
    type: FETCH_MOVIE,
    payload: getMovie(id),
  })
);
