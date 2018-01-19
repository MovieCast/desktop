import { app } from 'electron';
import windows from './windows';

export function info(...args) {
  sendLog('info', ...args);
}

export function debug(...args) {
  sendLog('debug', ...args);
}

export function warn(...args) {
  sendLog('warn', ...args);
}

export function error(...args) {
  sendLog('error', ...args);
}

function sendLog(type, ...args) {
  if (app.ipcReady) {
    windows.app.send(type, ...args);
  } else {
    app.once('ipcReady', () => windows.app.send(type, ...args));
  }
}
