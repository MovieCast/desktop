import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';

import rootReducer from '../reducers';
import * as electronActions from '../actions/electron';
import * as settingsActions from '../actions/settings';
import * as itemsActions from '../actions/items';

export const SCOPE_MAIN = 'SCOPE_MAIN';
export const SCOPE_RENDERER = 'SCOPE_RENDERER';

export const configureStoreWithHistory = (initialState, scope = SCOPE_MAIN) => {
  let history;

  if (scope === SCOPE_RENDERER) {
    history = createHashHistory();
  }

  const middleware = getMiddleware(scope, history);
  const enhancer = createEnhancer(scope, middleware);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  replayAction(scope, store);

  return { store, history };
};

// Creates a middleware array based on the current scope.
const getMiddleware = (scope, history) => {
  // Initial middleware, needed for all scopes
  const middleware = [
    thunk
  ];

  switch (scope) {
    case SCOPE_MAIN:
      return [
        triggerAlias,
        ...middleware,
        forwardToRenderer
      ];
    case SCOPE_RENDERER:
      return [
        forwardToMain,
        ...middleware,
        routerMiddleware(history),
        createLogger({
          level: !process.env.NODE_ENV ? 'info' : undefined,
          collapsed: true
        })
      ];
    default:
      throw Error(`UnsupportedScope: ${scope} is not supported!`);
  }
};

// Creates a enhancer based on the current scope
const createEnhancer = (scope, middleware) => {
  const enhancers = [];

  // Redux DevTools Configuration
  const actionCreators = {
    ...electronActions,
    ...settingsActions,
    ...itemsActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, max-len */
  const composeEnhancers = scope === SCOPE_RENDERER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && !process.env.NODE_ENV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle, max-len */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  return composeEnhancers(...enhancers);
};

const replayAction = (scope, store) => {
  switch (scope) {
    case SCOPE_MAIN:
      replayActionMain(store);
      break;
    case SCOPE_RENDERER:
      replayActionRenderer(store);
      break;
    default:
      throw Error(`UnsupportedScope: ${scope} is not supported!`);
  }
};

// export default { configureStore, history };
