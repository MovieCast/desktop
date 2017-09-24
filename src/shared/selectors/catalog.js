import { createSelector } from 'reselect';

// Select entities from state
const getResultMap = (state) => state.result;
const getMoviesMap = (state) => state.entities.movies;

// Select movie result from state
const getResult = createSelector(
    getResultMap,
    (resultMap) => resultMap
);

// Select movies from state
const getMovies = createSelector(
    getMoviesMap,
    (moviesMap) => moviesMap
);

// Select filter from state
const getFilter = (state) => state.get('filter').toJS();

// Select movie result list
const getMoviesResult = createSelector(
  getResult,
  getMovies,
  (result, movies) => {
    if (!result) return null;
    return result.map(movieId => movies[movieId]);
  }
);

export {
  getMoviesResult,
  getFilter
};
