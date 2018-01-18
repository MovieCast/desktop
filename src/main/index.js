/* eslint-disable import/no-named-as-default-member */

import { app } from 'electron';
import parallel from 'run-parallel';
import { DELAYED_INIT } from '../config';
import ipc from './ipc';
import * as logger from './logger';
import * as menu from './menu';
import * as extensions from './extensions';
import * as Store from './store';
import windows from './windows';
import * as updater from './updater';

console.time('main:init');

// Prevent multiple instances of app from running at same time.
// New instances signal this instance and quit.
const shouldQuit = app.makeSingleInstance(onAppOpen);

if (!shouldQuit) {
  init();
} else {
  app.quit();
}

function init() {
  let isReady = false; // app ready, windows can be created
  app.ipcReady = false; // main window has finished loading and IPC is ready
  app.isQuitting = false;

  parallel({
    appReady: (cb) => app.on('ready', () => cb(null)),
    store: (cb) => Store.load().then(store => cb(null, store)).catch(err => cb(err, null))
  }, onReady);

  function onReady(err, results) {
    if (err) throw err;

    isReady = true;

    // Install dev extensions
    extensions.init();

    // windows.app.init(results.store); // Restore the window to the last state we saved it in
    windows.app.init();
    windows.engine.init();
    menu.init();

    // To keep app startup fast, some code is delayed.
    setTimeout(delayedInit.bind(this, results), DELAYED_INIT);
  }

  ipc.init();

  app.once('ipcReady', () => {
    console.timeEnd('main:init');
  });

  app.on('before-quit', (e) => {
    if (app.isQuitting) return;
    e.preventDefault();

    app.isQuitting = true;

    // windows.app.dispatch('stateSaveImmediate'); // try to save state on exit
    // ipcMain.once('stateSaved', () => app.quit());

    Store.save().then(() => app.quit()).catch(console.error);

    // Give the state saver some time to save,
    // if it takes more then 4 seconds, quit
    setTimeout(() => {
      console.error('Saving state took too long. Quitting.');
      app.quit();
    }, 4000);
  });

  app.on('activate', () => {
    if (isReady) windows.app.show();
  });
}

function delayedInit(results) {
  if (app.isQuitting) return;

  logger.debug('delayedInit: results', results);

  if (process.env.NODE_ENV === 'production') {
    updater.init(results.store);
  } else {
    logger.warn('updater: Not starting because in development environment!');
  }
}

function onAppOpen(newArgv) {
  if (app.ipcReady) {
    logger.info('Second app instance opened, but was prevented:', newArgv);
    windows.app.show();
  }
}

process.on('uncaughtException', (err) => {
  console.log(err);
});

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});
