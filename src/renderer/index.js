import { ipcRenderer as ipc } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { getInitialStateRenderer } from 'electron-redux';
import StoreFactory, { SCOPE_RENDERER } from '../shared/store/StoreFactory';
import './app.global.css';

import App from './components/App/App';

// Action Creators
import {
  torrentInfoHash,
  torrentMetaData,
  torrentProgress,
  torrentDone
} from '../shared/actions/torrent';

console.time('init');

const storeFactory = new StoreFactory(SCOPE_RENDERER);
const store = storeFactory.configureStore(getInitialStateRenderer());
const history = storeFactory.history;
const dispatch = store.dispatch;

init();

function init() {
  ipc.on('te-warning', (event, err) => {
    console.warn(`torrentEngine: ${err.message}`);
  });

  ipc.on('te-error', (event, err) => {
    console.error(`torrentEngine: ${err.message}`);
  });

  ipc.on('te-infohash', (event, torrentKey, infoHash) => {
    dispatch(torrentInfoHash(torrentKey, infoHash));
  });

  ipc.on('te-metadata', (event, torrentKey, info) => {
    dispatch(torrentMetaData(torrentKey, info));
  });

  ipc.on('te-progress', (event, torrentKey, info) => {
    console.log(torrentKey, info);
    dispatch(torrentProgress(torrentKey, info));
  });

  ipc.on('te-done', (event, torrentKey, info) => {
    dispatch(torrentDone(torrentKey, info));
  });

  render(App);


  console.timeEnd('init');
}

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
