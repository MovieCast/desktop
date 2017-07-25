import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';

import { configureStoreAndHistory, SCOPE_RENDERER } from '../shared/store/configureStore';
import './app.global.css';

import App from './components/refactor/App';

const { store, history } = configureStoreAndHistory(getInitialStateRenderer(), SCOPE_RENDERER);

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/refactor/App', () => {
    const NextApp = require('./components/refactor/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
