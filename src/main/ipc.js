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
  ipc.emit = function (name, e, ...args) {
    if (name.startsWith('te-')) {
      if (e.sender.browserWindowOptions.title === 'moviecast-torrent-engine') {
        // Send message to main window
        mainWindow.send(name, ...args);
        console.log(`ipcBridge: torrentWindow -> mainWindow: ${name}`);
      } else {
        // Send message to webtorrent window
        torrentWindow.send(name, ...args);
        console.log(`ipcBridge: mainWindow -> torrentWindow: ${name}`);
      }
    }

    // Emit all other events normally
    defaultEmit.call(ipc, name, e, ...args);
  };
}
