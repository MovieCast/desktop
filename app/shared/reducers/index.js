import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import application from './application';
import settings from './settings';
import updater from './updater';
import movies from './movies';

const rootReducer = combineReducers({
  application,
  settings,
  updater,
  movies,
  router,
});

export default rootReducer;
