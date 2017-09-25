import { schema, normalize } from 'normalizr';

// TODO: add torrents to schema
export const movie = new schema.Entity('movies', {}, {
  idAttribute: '_id'
});
export const movieList = [movie];

export default (moviesResult) => normalize(moviesResult, movieList);
