import { createAliasedAction } from 'electron-redux';
import { push } from 'react-router-redux';
import { getMovies, getMovie } from '../../main/api/movies';
import { addTorrent, startStreamServer } from './torrent';
import movieNormalizer from '../normalizers/movie';
// import { setupPlayer } from './player';

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const FETCH_MOVIE_REQUEST = 'FETCH_MOVIE_REQUEST';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILURE = 'FETCH_MOVIE_FAILURE';

export const SET_FILTER = 'SET_FILTER';

/**
 * @todo
 * This function will prepare a couple things
 * in order to make it possible to watch an item
 *
 * 1. dispatch(addTorrent()) - Start the torrent of this item
 * 2. dispatch(startStreamServer()) - Will start the stream server for this specific torrent
 * 3. dispatch(setupPlayer()) - Will make sure player has the correct title, etc.
 * 4. more... xD
 */
export function playItem(itemId, torrentIndex) {
  return (dispatch, getState) => {
    const { catalog, torrent } = getState();
    const item = catalog.entities.movies[itemId];
    const torrentItem = item.torrents.en[torrentIndex];
    console.log(item);
    // Save snapshot of the key because addTorrent will change nextKey
    const torrentKey = torrent.nextKey;

    // const magnetURI = `magnet:?xt=urn:btih:${torrentItem.hash}&dn=${encodeURI(item.title)}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;

    // Start torrent and stream http server for it
    dispatch(addTorrent(torrentItem.url));
    dispatch(startStreamServer(torrentKey));

    // Setup the player with the correct title and src
    // TODO: Find a way to pass in the stream server src
    // dispatch(setupPlayer(item.title, null));

    // More more more more more
    dispatch(push('/player'));
  };
}

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
export const fetchMovies = createAliasedAction(
  FETCH_MOVIES_REQUEST,
  () => ({
    types: [FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE],
    // shouldRequest: state => !state.catalog.entities,
    request: ({ catalog }) => getMovies(catalog.filter),
    parser: ({ data }) => movieNormalizer(data)
  })
);

export const fetchMovie = createAliasedAction(
  FETCH_MOVIE_REQUEST,
  (id) => ({
    types: [FETCH_MOVIE_REQUEST, FETCH_MOVIE_SUCCESS, FETCH_MOVIE_FAILURE],
    request: () => getMovie(id),
    parser: ({ data }) => movieNormalizer(data)
  })
);
