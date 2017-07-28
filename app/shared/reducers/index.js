import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import application from './application';
import updater from './updater';
import movies from './movies';

const rootReducer = combineReducers({
  application,
  updater,
  movies,
  router,
});

export default rootReducer;
