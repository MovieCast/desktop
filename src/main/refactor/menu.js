/* eslint-disable import/prefer-default-export */
import { shell, Menu } from 'electron';
import { bugs, version } from '../../../package.json';
import { app, engine } from './windows';

export function init() {
  const menu = Menu.buildFromTemplate(getMenuTemplate());
  Menu.setApplicationMenu(menu);

  if (process.env.NODE_ENV === 'development') {
    addFancyInspectContextMenuThing();
  }
}

/**
 * Generates the menu template
 * @todo: Add menu item for the torrent engine process
 */
function getMenuTemplate() {
  return [{
    label: '&File',
    submenu: [{
      label: '&Exit',
      accelerator: 'CmdOrCtrl+Q',
      role: 'quit'
    }]
  },

  {
    label: '&View',
    submenu: [{
      label: '&Reload',
      accelerator: 'CmdOrCtrl+R',
      click: () => {
        app.win.webContents.reloadIgnoringCache();
      }
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click: () => {
        app.toggleFullScreen();
      }
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+CmdOrCtrl+I',
      click: () => {
        app.toggleDevTools();
      }
    }, {
      label: 'Show Torrent Engine Process',
      accelerator: 'Alt+CmdOrCtrl+E',
      click: () => {
        engine.toggleDevTools();
      }
    }]
  },

  {
    label: 'Help',
    submenu: [{
      label: `Version ${version}`,
      enabled: false
    }, {
      label: 'Check for Update',
      enabled: false
    }, {
      type: 'separator'
    }, {
      label: 'Report Issue',
      click: () => {
        shell.openExternal(bugs.url);
      }
    }, {
      label: 'Suggest Feature',
      click: () => {
        shell.openExternal(bugs.url);
      }
    }]
  }];
}

function addFancyInspectContextMenuThing() { // Yea...
  app.win.webContents.on('context-menu', (e, props) => {
    const { x, y } = props;

    Menu
      .buildFromTemplate([{
        label: 'Inspect element',
        click: () => {
          app.win.inspectElement(x, y);
        }
      }])
      .popup(app.win);
  });
}
