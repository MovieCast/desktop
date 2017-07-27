import { app, dialog } from 'electron';
import { promisifyAll } from 'bluebird';
import jsonStorage from 'electron-json-storage';

import StoreFactory, { SCOPE_MAIN } from '../shared/store/StoreFactory';
import { installExtensions } from './extensions';
import { createMainWindow } from './window';

const storage = promisifyAll(jsonStorage);

global.state = {};

async function start() {
  // global.state = await storage.get('state');

  const storeFactory = new StoreFactory(SCOPE_MAIN);
  const store = storeFactory.configureStore(global.state);

  // Update the global state and storage state
  store.subscribe(async () => {
    global.state = store.getState();

    // await storage.set('state', global.state);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createMainWindow();
  });

  createMainWindow();
}

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }
  try {
    await start();
  } catch (err) {
    dialog.showErrorBox('MovieCast failed to start! ', `Please report the following error:\n${err.stack}`);
  }
});
