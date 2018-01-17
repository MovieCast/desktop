import axios from 'axios';
import * as logger from '../logger';

const api = axios.create({
  // Using popcorn-api for now, until we finished our own scraper
  // baseURL: 'http://tv-v2.api-fetch.website'
  baseURL: 'http://content.moviecast.xyz'
});

export function getMovies({ page = 1, genre = 'all', sort = 'trending', keywords = '' } = {}) {
  const request = api.get(`/movies/${page}`, {
    params: {
      genre,
      sort,
      keywords
    }
  });
  return request;
}

export function getMovie(id) {
  logger.info(`getMovie: ${id}`);
  return api.get(`/movies/detail/${id}`);
}
