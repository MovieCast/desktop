import { app, ipcMain as ipc } from 'electron';

module.exports = {
  init
};

function init() {
  ipc.once('ipcReady', () => {
    app.ipcReady = true;
    app.emit('ipcReady');
  });
}
