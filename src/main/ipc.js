/*
 * NOTE: We are moving away from using classes, for things like this
 * it is a lot easier to just use plain functions.
 */
import { ipcMain as ipc } from 'electron';

/**
 * Setup IPC and the IPC bridge between renderer and torrent engine
 */
export function patch(mainWindow, torrentWindow) {
  console.log('Patched IPC');
  /**
   * IPC Bridge
   * Inspired by WebTorrent Desktop
   *
   * We actually just extend the default ipc.emit function
   */
  const defaultEmit = ipc.emit;
  ipc.emit = function (name, event, ...args) {
    if (name.startsWith('te-')) {
      console.log(`Patching ipc event ${name}...`);
      if (event.sender.browserWindowOptions.title === 'moviecast-torrent-engine') {
        mainWindow.send(name, ...args);
      } else {
        torrentWindow.send(name, ...args);
      }
    }

    // Other events don't have to be bridged
    defaultEmit.call(ipc, name, event, ...args);
  };
}
