import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import StoreFactory, { SCOPE_RENDERER } from '../shared/store/StoreFactory';
import './app.global.css';

import App from './components/App/App';

const storeFactory = new StoreFactory(SCOPE_RENDERER);
const store = storeFactory.configureStore(getInitialStateRenderer());
const history = storeFactory.history;

function render(Component) {
  ReactDOM.render(
    <AppContainer
      errorReporter={({ error }) => {
        throw error;
      }}
    >
      <Component store={store} history={history} />
    </AppContainer>,
  document.getElementById('root')
  );
}

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App'); // eslint-disable-line global-require
    render(NextApp);
  });
}

render(App);
