// import axios from 'axios';
import faker from 'faker'; // Remove me later ples...

export const FETCH_MOVIES = 'fetch_movies';
export const FETCH_MOVIE = 'fetch_movie';

/* TODO: fetchMovieByPage(page) */
export function fetchMovies() {
  return (dispatch) => {
    dispatch({
      type: FETCH_MOVIES,
      payload: {
        data: [
          {
            id: 1,
            name: faker.name.findName()
          },
          {
            id: 2,
            name: faker.name.findName()
          },
          {
            id: 3,
            name: faker.name.findName()
          },
          {
            id: 4,
            name: faker.name.findName()
          }
        ]
      }
    });
  };
}

export function fetchMovie(id) {
  return dispatch => {
    dispatch({
      type: FETCH_MOVIE,
      payload: {
        data: {
          id,
          name: faker.name.findName()
        }
      }
    });
  };
}
