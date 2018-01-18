import { fetchMovies } from './entities';
// import { setupPlayer } from './player';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';

export const SET_FILTER = 'SET_FILTER';


// export function stopItem()

// Temp fix
export const resetResult = () => ({
  type: 'RESET_RESULT'
});

export const setFilter = (payload) => (dispatch) => {
  // Temp fixxzzz
  if (payload.page === 1) {
    dispatch(resetResult());
  }

  dispatch({
    type: SET_FILTER,
    payload
  });
  dispatch(fetchMovies());
};
