import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import updater from './updater';
import movies from './movies';

const rootReducer = combineReducers({
  updater,
  movies,
  router,
});

export default rootReducer;
