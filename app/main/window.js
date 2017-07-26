import { BrowserWindow } from 'electron';
import path from 'path';
import MenuBuilder from './menu';

let mainWindow = null;

function showWindow() {
  mainWindow.show();
  mainWindow.focus();
}

export function createMainWindow() {
  if (mainWindow !== null) {
    if (!mainWindow.webContents.isLoading()) {
      showWindow();
    }
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    frame: false
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/app.html')}`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    showWindow();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  return mainWindow;
}

export default { createMainWindow };
