import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import application from './application';
import settings from './settings';
import updater from './updater';
import catalog from './catalog';
import player from './player';
import torrent from './torrent';

const rootReducer = combineReducers({
  application,
  settings,
  updater,
  catalog,
  player,
  torrent,
  router,
});

export default rootReducer;
