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
    const params = Array.prototype.slice.call(args, 1);
    params.unshift(`[%cIPC/INFO%c] ${args[0]}`, 'color: blue;', 'color: black;');
    console.info(...params);
  });

  ipc.on('debug', (event, ...args) => {
    const params = Array.prototype.slice.call(args, 1);
    params.unshift(`%c[%cIPC/DEBUG%c] %c${args[0]}`, 'color: black;', 'color: green;', 'color: black;', 'color: blue;');
    console.debug(...params);
  });

  ipc.on('warn', (event, ...args) => {
    const params = Array.prototype.slice.call(args, 1);
    params.unshift(`[%cIPC/WARNING%c] ${args[0]}`, 'color: orange;', 'color: black;');
    console.warn(...params);
  });

  ipc.on('error', (event, ...args) => {
    const params = Array.prototype.slice.call(args, 1);
    params.unshift(`%c[%cIPC/ERROR%c] ${args[0]}`, 'color: black;', 'color: red;', 'color: black;');
    console.error(...params);
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

// Ples fix this part...
if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const NextApp = require('./components/App/App'); // eslint-disable-line global-require
    render(NextApp);
  });
}

render(App);
