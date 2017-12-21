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
  ipc.on('info', (event, ...args) => {
    console.info(...args);
  });

  ipc.on('debug', (event, ...args) => {
    console.debug(...args);
  });

  ipc.on('warn', (event, ...args) => {
    console.warn(...args);
  });

  ipc.on('error', (event, ...args) => {
    console.error(...args);
  });

  ipc.on('te-infohash', (event, key, infoHash) => {
    dispatch(torrentInfoHash(key, infoHash));
  });

  ipc.on('te-metadata', (event, key, info) => {
    dispatch(torrentMetaData(key, info));
  });

  ipc.on('te-progress', (event, key, info) => {
    dispatch(torrentProgress(key, info));
  });

  ipc.on('te-done', (event, key, info) => {
    dispatch(torrentDone(key, info));
  });

  ipc.send('ipcReady');

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
