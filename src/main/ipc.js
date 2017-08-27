/* NOTE: We are moving away from only classes, this makes everything a bit simpler. */
import { ipcMain as ipc } from 'electron';

/**
 * Setup IPC and the IPC bridge between renderer and torrent engine
 */
init() {
  
  /**
   * IPC Bridge
   * Inspired by WebTorrent Desktop
   * 
   * We actually just overwrite the default ipc.emit function
   */ 
  const defaultEmit = ipc.emit;
  ipc.emit = function (name, event, ...args) {
    if(name.startsWith('te-')) {
      if(event.sender.browserWindowOptions.title === 'moviecast-torrent-engine')
    }
  }
}