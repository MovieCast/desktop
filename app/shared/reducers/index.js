import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import application from './application';
import settings from './settings';
import updater from './updater';
import catalog from './catalog';

const rootReducer = combineReducers({
  application,
  settings,
  updater,
  catalog,
  router,
});

export default rootReducer;
