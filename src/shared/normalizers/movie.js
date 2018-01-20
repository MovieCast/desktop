import { schema, normalize } from 'normalizr';

const movieModel = {
  _id: null,
  imdb_id: null,
  title: null,
  year: null,
  slug: null,
  synopsis: null,
  runtime: null,
  country: null,
  released: null,
  trailer: null,
  certification: null,
  torrents: {},
  rating: {
    percentage: null,
    watching: null,
    votes: null
  },
  images: {
    poster: null,
    background: null
  },
  genres: []
};

// TODO: add torrents to schema
export const movie = new schema.Entity('movies', {}, {
  idAttribute: '_id',
  processStrategy: (value) => ({
    ...movieModel,
    ...value
  })
});
export const movieList = [movie];

export default (moviesResult) => normalize(moviesResult, movieList);
