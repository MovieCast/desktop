import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import StoreFactory, { SCOPE_RENDERER } from '../shared/store/StoreFactory';
import './app.global.css';

import App from './containers/App';

const storeFactory = new StoreFactory(SCOPE_RENDERER);
const store = storeFactory.configureStore(getInitialStateRenderer());
const history = storeFactory.history;

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

// TODO: Because App is no longer a real component, the store breaks on hot update!
// Instead of handling the theme in App handle it in AppFrame or AppWrapper or something
/* if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
} */
