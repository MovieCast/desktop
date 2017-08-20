import { createAliasedAction } from 'electron-redux';
import { push } from 'react-router-redux';
import { getList, getMovie } from '../../main/api/movies';
import { addTorrent, startStreamServer } from './torrent';
import { setupPlayer } from './player';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIE = 'FETCH_MOVIE';

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
    const item = catalog.items[itemId];
    const torrentItem = item.torrents[torrentIndex];
    // Save snapshot of the key because addTorrent will change nextKey
    const torrentKey = torrent.nextKey;

    const magnetURI = `magnet:?xt=urn:btih:${torrentItem.hash}&dn=${encodeURI(item.title)}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;

    // Start torrent and stream http server for it
    dispatch(addTorrent(magnetURI));
    dispatch(startStreamServer(torrentKey));

    // Setup the player with the correct title and src
    // TODO: Find a way to pass in the stream server src
    // dispatch(setupPlayer(item.title, null));

    // More more more more more
    dispatch(push('/player'));
  };
}

// export function stopItem()

export const fetchMovies = createAliasedAction(
  FETCH_MOVIES,
  ({ page, genre, sort }) => ({
    type: FETCH_MOVIES,
    payload: getList(page, genre, sort),
  })
);

export const fetchMovie = createAliasedAction(
  FETCH_MOVIE,
  (id) => ({
    type: FETCH_MOVIE,
    payload: getMovie(id),
  })
);
