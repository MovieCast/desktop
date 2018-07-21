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
  torrents: [],
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
  processStrategy: (value) => {
    const processMovie = {
      ...movieModel,
      ...value,
    };

    if (processMovie.torrents.length > 0) {
      // #QUICKFIX 1: Remove 3D
      const foundIndex = processMovie.torrents.findIndex(torrent => torrent.quality === '3D');
      if (foundIndex > -1) {
        processMovie.torrents.splice(foundIndex, 1);
      }

      // #QUICKFIX 2: Sort quality by...length yea...
      processMovie.torrents.sort((a, b) => {
        if (a.quality.length < b.quality.length) { return 1; }
        if (a.quality.length > b.quality.length) { return -1; }
        return 0;
      });
    }

    return processMovie;
  }
});
export const movieList = [movie];

export default (moviesResult) => normalize(moviesResult, movieList);
