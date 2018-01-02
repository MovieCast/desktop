/* eslint-disable import/no-named-as-default-member, no-param-reassign, no-mixed-operators */
import _ from 'lodash';
import { app, screen, BrowserWindow } from 'electron';
import * as config from '../../../config';
import * as logger from '../logger';

const manager = module.exports = {
  init,
  dispatch,
  show,
  hide,
  send,
  setAspectRatio,
  setBounds,
  setProgress,
  toggleDevTools,
  toggleFullScreen,
  win: null
};

function init() {
  // If window was created already just show it
  if (manager.win) {
    return manager.win.show();
  }

  // const initialBounds = Object.assign(config.WINDOW_INITIAL_BOUNDS, state.saved.bounds);

  // Temp fix till our store is ready
  const display = screen.getPrimaryDisplay();
  const defaultWidth = Math.round(display.size.width * 0.8);
  const defaultHeight = Math.round(display.size.height * 0.8);

  const win = manager.win = new BrowserWindow({
    backgroundColor: '#282828',
    backgroundThrottling: false,
    height: defaultHeight,
    minHeight: config.WINDOW_MIN_HEIGHT,
    minWidth: config.WINDOW_MIN_WIDTH,
    show: false,
    title: config.APP_WINDOW_TITLE,
    useContentSize: true, // Specify web page size without OS chrome
    frame: false,
    width: defaultWidth,
    // x: initialBounds.x,
    // y: initialBounds.y
  });

  win.loadURL(config.WINDOW_MAIN);

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('enter-full-screen', () => {
    send('fullscreenChanged', true);
  });

  win.on('leave-full-screen', () => {
    send('fullscreenChanged', false);
  });

  win.on('move', _.debounce((e) => {
    send('windowBoundsChanged', e.sender.getBounds());
  }, 1000));

  win.on('resize', _.debounce((e) => {
    send('windowBoundsChanged', e.sender.getBounds());
  }, 1000));

  win.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      hide();
      app.quit();
    }
  });
}

function dispatch(...args) {
  send('dispatch', ...args);
}

function show() {
  if (!manager.win) return;
  manager.win.show();
}

function hide() {
  if (!manager.win) return;
  manager.win.hide();
}

function send(...args) {
  if (!manager.win) return;
  manager.win.send(...args);
}

/**
 * Enforce window aspect ratio. Remove with 0. (Mac)
 */
function setAspectRatio(aspectRatio) {
  if (!manager.win) return;
  manager.win.setAspectRatio(aspectRatio);
}

/**
 * Change the size of the window.
 * TODO: Clean this up? Seems overly complicated.
 */
function setBounds(bounds, maximize) {
  // Do nothing in fullscreen
  if (!manager.win || manager.win.isFullScreen()) {
    logger.debug('setBounds: not setting bounds because we\'re in full screen');
    return;
  }

  // Maximize or minimize, if the second argument is present
  let willBeMaximized;
  if (maximize === true) {
    if (!manager.win.isMaximized()) {
      logger.debug('setBounds: maximizing');
      manager.win.maximize();
    }
    willBeMaximized = true;
  } else if (maximize === false) {
    if (manager.win.isMaximized()) {
      logger.debug('setBounds: unmaximizing');
      manager.win.unmaximize();
    }
    willBeMaximized = false;
  } else {
    willBeMaximized = manager.win.isMaximized();
  }

  // Assuming we're not maximized or maximizing, set the window size
  if (!willBeMaximized) {
    logger.debug(`setBounds: setting bounds to ${JSON.stringify(bounds)}`);
    if (bounds.x === null && bounds.y === null) {
      // X and Y not specified? By default, center on current screen
      const scr = screen.getDisplayMatching(manager.win.getBounds());
      bounds.x = Math.round(scr.bounds.x + (scr.bounds.width / 2) - (bounds.width / 2));
      bounds.y = Math.round(scr.bounds.y + (scr.bounds.height / 2) - (bounds.height / 2));

      logger.debug(`setBounds: centered to ${JSON.stringify(bounds)}`);
    }
    // Resize the window's content area (so window border doesn't need to be taken
    // into account)
    if (bounds.contentBounds) {
      manager.win.setContentBounds(bounds, true);
    } else {
      manager.win.setBounds(bounds, true);
    }
  } else {
    logger.debug('setBounds: not setting bounds because of window maximization');
  }
}

/**
 * Set progress bar to [0, 1]. Indeterminate when > 1. Remove with < 0.
 */
function setProgress(progress) {
  if (!manager.win) return;
  manager.win.setProgressBar(progress);
}

function toggleDevTools() {
  if (!manager.win) return;
  logger.debug('toggleDevTools: app');
  if (manager.win.webContents.isDevToolsOpened()) {
    manager.win.webContents.closeDevTools();
  } else {
    manager.win.webContents.openDevTools({ detach: true });
  }
}

function toggleFullScreen(flag) {
  if (!manager.win || !manager.win.isVisible()) {
    return;
  }

  if (flag == null) flag = !manager.win.isFullScreen();

  logger.debug(`toggleFullScreen ${flag}`);

  if (flag) {
    // Fullscreen and aspect ratio do not play well together. (Mac)
    manager.win.setAspectRatio(0);
  }

  manager.win.setFullScreen(flag);
}
