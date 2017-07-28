import axios from 'axios';

const URL_ROOT = 'https://yts.ag/api/v2';

export function getList() {
  const request = axios.get(`${URL_ROOT}/list_movies.json`);
  return request;
}

export function getMovie(id) {
  const request = axios.get(`${URL_ROOT}/movie_details.json?movie_id=${id}`);
  return request;
}
