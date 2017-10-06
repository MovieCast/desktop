/* eslint-disable import/prefer-default-export */
import { shell, Menu } from 'electron';
import { bugs, version } from '../../../package.json';

export function init() {
  const menu = Menu.buildFromTemplate(getMenuTemplate());
  Menu.setApplicationMenu(menu);
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
      click(item, window) {
        if (window) { window.webContents.reloadIgnoringCache(); }
      }
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      role: 'togglefullscreen'
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+CmdOrCtrl+I',
      click(item, window) {
        if (window) { window.toggleDevTools(); }
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
      click() {
        shell.openExternal(bugs.url);
      }
    }, {
      label: 'Suggest Feature',
      click() {
        shell.openExternal(bugs.url);
      }
    }]
  }];
}
