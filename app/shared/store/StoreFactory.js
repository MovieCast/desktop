import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  forwardToMain,
  forwardToRenderer,
  triggerAlias,
  replayActionMain,
  replayActionRenderer,
} from 'electron-redux';

import rootReducer from '../reducers';
import * as applicationActions from '../actions/application';
import * as updaterActions from '../actions/updater';
import * as settingsActions from '../actions/settings';
import * as itemsActions from '../actions/items';

export default class StoreFactory {
  static SCOPE_MAIN = 'SCOPE_MAIN';
  static SCOPE_RENDERER = 'SCOPE_RENDERER';

  get history() {
    if (this.scope === StoreFactory.SCOPE_MAIN) {
      return null;
    }

    // eslint-disable-next-line no-return-assign, no-underscore-dangle
    return this._history ? this._history : this._history = createHashHistory();
  }

  constructor(scope = StoreFactory.SCOPE_MAIN) {
    this.scope = scope;
    this._history = null; // eslint-disable-line no-underscore-dangle
  }

  configureStore(initialState) {
    const middleware = this.getMiddleware();
    const enhancer = this.createEnhancer(middleware);

    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(import('../reducers'))
      );
    }

    // Setup replay for electron-redux
    this.replayAction(store);

    return store;
  }

  getMiddleware() {
    const initialMiddleware = [
      thunk,
      promise
    ];

    switch (this.scope) {
      case StoreFactory.SCOPE_MAIN:
        return [
          triggerAlias,
          ...initialMiddleware,
          forwardToRenderer
        ];
      case StoreFactory.SCOPE_RENDERER:
        return [
          forwardToMain,
          ...initialMiddleware,
          routerMiddleware(this.history),
          createLogger({
            level: process.env.NODE_ENV === 'development' ? 'info' : undefined,
            collapsed: true
          })
        ];
      default:
        throw Error(`UnsupportedScope: ${this.scope} is not supported!`);
    }
  }

  createEnhancer(middleware) {
    const enhanced = [
      applyMiddleware(...middleware)
    ];

    const actionCreators = {
      ...applicationActions,
      ...updaterActions,
      ...settingsActions,
      ...itemsActions,
      ...routerActions,
    };

    // TODO: Include all action creators.
    const composeEnhancers = composeWithDevTools({
      actionCreators
    });

    switch (this.scope) {
      case StoreFactory.SCOPE_MAIN:
        return compose(...enhanced);
      case StoreFactory.SCOPE_RENDERER:
        return composeEnhancers(...enhanced);
      default:
        console.log('Whut');
        throw Error(`UnsupportedScope: ${this.scope} is not supported!`);
    }
  }

  replayAction(store) {
    switch (this.scope) {
      case StoreFactory.SCOPE_MAIN:
        replayActionMain(store);
        break;
      case StoreFactory.SCOPE_RENDERER:
        replayActionRenderer(store);
        break;
      default:
        throw Error(`UnsupportedScope: ${this.scope} is not supported!`);
    }
  }
}
