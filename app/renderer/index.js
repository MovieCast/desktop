import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import { createHashHistory } from 'history';
import StoreFactory, { SCOPE_RENDERER } from '../shared/store/StoreFactory';

// import { configureStore, SCOPE_RENDERER } from '../shared/store/configureStore';
import './app.global.css';

import App from './components/App';

// const store = configureStore(getInitialStateRenderer(), SCOPE_RENDERER);
// const history = createHashHistory();

const storeFactory = new StoreFactory(SCOPE_RENDERER);
const store = storeFactory.configureStore(getInitialStateRenderer());
const history = storeFactory.history;

console.log(history);

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
