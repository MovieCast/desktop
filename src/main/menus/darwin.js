import {
    shell
} from 'electron';

import { bugs, version } from '../../package.json';

module.exports = [{
  label: '&File',
  submenu: [{
    label: '&Exit',
    accelerator: 'Command+Q',
    role: 'quit'
  }]
},

{
  label: '&View',
  submenu: [{
    label: '&Reload',
    accelerator: 'Command+R',
    click(item, window) {
      if (window) window.reload();
    }
  }, {
    label: 'Toggle &Developer Tools',
    accelerator: 'Alt+Command+I',
    click(item, window) {
      if (window) { window.webContents.toggleDevTools(); }
    }
  }, {
    label: 'Toggle &Full Screen',
    accelerator: 'F11',
    role: 'togglefullscreen'
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
}
];
