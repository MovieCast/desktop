import { normalize } from 'normalizr';
import MovieProvider from '../providers/MovieProvider';
import * as movieSchema from '../normalizers/movie';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';

export function fetchMovies() {
  return {
    types: [FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE],
    request: ({ catalog }) => MovieProvider.getMovies(catalog.filter),
    parser: ({ data }) => normalize(data.results, movieSchema.movieList)
  };
}

export function fetchMovie(id) {
  return {
    types: [FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE],
    request: () => MovieProvider.getMovie(id),
    parser: ({ data }) => normalize(data, movieSchema.movie)
  };
}
