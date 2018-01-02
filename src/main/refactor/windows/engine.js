import { app, BrowserWindow } from 'electron';
import * as config from '../../../config';

import { debug } from '../logger';

const engine = module.exports = {
  init,
  send,
  show,
  toggleDevTools,
  win: null
};

function init() {
  const win = engine.win = new BrowserWindow({
    center: true,
    fullscreen: false,
    fullscreenable: false,
    height: 150,
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    skipTaskbar: true,
    title: 'MovieCast Torrent Engine',
    useContentSize: true,
    width: 150
  });

  win.loadURL(config.WINDOW_TORRENTENGINE);

  // Prevent killing the Engine process
  win.on('close', (e) => {
    if (app.isQuitting) {
      return;
    }
    e.preventDefault();
    win.hide();
  });
}

function show() {
  if (!engine.win) return;
  engine.win.show();
}

function send(...args) {
  if (!engine.win) return;
  engine.win.send(...args);
}

function toggleDevTools() {
  if (!engine.win) return;
  debug('toggleDevTools: engine');
  if (engine.win.webContents.isDevToolsOpened()) {
    engine.win.webContents.closeDevTools();
    engine.win.hide();
  } else {
    // Set detach on true, to force a detatched window.
    engine.win.webContents.openDevTools({ detach: true });
  }
}
