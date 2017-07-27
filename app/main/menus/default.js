import { shell } from 'electron';
import { bugs, version } from '../../package.json';

module.exports = [{
  label: '&File',
  submenu: [{
    label: '&Exit',
    accelerator: 'Ctrl+Q',
    role: 'quit'
  }]
},

{
  label: '&View',
  submenu: [{
    label: '&Reload',
    accelerator: 'Ctrl+R',
    click(item, window) {
      if (window) { window.webContents.reload(); }
    }
  }, {
    label: 'Toggle &Full Screen',
    accelerator: 'F11',
    role: 'togglefullscreen'
  }, {
    label: 'Toggle &Developer Tools',
    accelerator: 'Alt+Ctrl+I',
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
