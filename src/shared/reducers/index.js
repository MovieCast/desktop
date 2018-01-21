import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import settings from './settings';
import updater from './updater';
import catalog from './catalog';
import detail from './detail';
import entities from './entities';
import player from './player';
import streamer from './streamer';
import torrent from './torrent';

const rootReducer = combineReducers({
  settings,
  updater,
  catalog,
  detail,
  entities,
  player,
  streamer,
  torrent,
  router,
});

export default rootReducer;
