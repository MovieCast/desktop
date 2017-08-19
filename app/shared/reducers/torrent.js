import _ from 'lodash';
import {
  TORRENT_WARNING,
  TORRENT_ERROR,
  TORRENT_ADD,
  TORRENT_UPDATE,
  TORRENT_REMOVE,
  STREAM_SERVER_START,
  STREAM_SERVER_STARTED,
  STREAM_SERVER_STOP,
  ServerStatus
} from '../actions/torrent';

const initialState = {
  error: null,
  warning: null,
  nextKey: 0,
  torrents: {},
  server: {
    status: ServerStatus.STOPPED
  }
};

export default function torrent(state = initialState, action) {
  switch (action.type) {
    case TORRENT_ADD: {
      return {
        ...state,
        nextKey: state.nextKey + 1
      };
    }
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
    case STREAM_SERVER_STARTED: {
      return {
        ...state,
        server: {
          ...state.server,
          ...action.payload
        }
      };
    }
    case STREAM_SERVER_START:
    case STREAM_SERVER_STOP: {
      return {
        ...state,
        server: {
          status: action.payload
        }
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
