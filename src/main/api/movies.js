import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yts.ag/api/v2'
});

export function getList(page = 1, genre = 'all', sort = 'year') {
  const request = api.get('/list_movies.json', {
    params: {
      page,
      genre,
      sort_by: sort
    }
  });
  return request;
}

export function getMovie(id) {
  const request = api.get(`/movie_details.json?movie_id=${id}`);
  return request;
}
