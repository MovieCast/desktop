import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import electron from './electron';
import movies from './movies';

const rootReducer = combineReducers({
  electron,
  movies,
  router,
});

export default rootReducer;
