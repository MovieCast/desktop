import _ from 'lodash';
import {
  TORRENT_WARNING,
  TORRENT_ERROR,
  TORRENT_UPDATE,
  TORRENT_REMOVE
} from '../actions/torrent';

const initialState = {
  error: null,
  warning: null,
  torrents: {}
};

export default function torrent(state = initialState, action) {
  switch (action.type) {
    case TORRENT_UPDATE: {
      return {
        ...state,
        torrents: {
          ...state.torrents,
          [action.payload.key]: action.payload
        }
      };
    }
    case TORRENT_REMOVE: {
      return {
        ...state,
        torrents: _.omit(state.torrents, action.payload)
      };
    }
    case TORRENT_WARNING:
      return {
        ...state,
        warning: action.payload
      };
    case TORRENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
