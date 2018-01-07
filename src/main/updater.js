/* eslint-disable import/prefer-default-export, global-require */
import { autoUpdater } from 'electron-updater';
import {
  checkingForUpdate,
  updateAvailable,
  updateDownloading,
  updateNotAvailable,
  updateError,
  updateDownloaded
} from '../shared/actions/updater';

// TODO: Make a customized updater which will do no more then downloading the installer.

export function init(store) {
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'debug';

  autoUpdater.autoDownload = false;

  autoUpdater.on('checking-for-update', () => {
    store.dispatch(checkingForUpdate());
  });

  autoUpdater.on('update-available', (info) => {
    store.dispatch(updateAvailable(info));
    console.log(info);
  });

  autoUpdater.on('update-not-available', (info) => {
    store.dispatch(updateNotAvailable(info));
    console.log(info);
  });

  autoUpdater.on('error', (err) => {
    store.dispatch(updateError(err));
  });

  autoUpdater.on('download-progress',
    ({ bytesPerSecond, transferred, total, percent }) => {
      console.log(`Download speed: ${bytesPerSecond} - Downloaded ${percent}% (${transferred}/${total}`);
      store.dispatch(updateDownloading(Math.round(percent)));
    }
  );

  autoUpdater.on('update-downloaded', (info) => {
    store.dispatch(updateDownloaded());
    console.log(info);
    setTimeout(() => {
      autoUpdater.quitAndInstall();
    }, 5000);
  });

  autoUpdater.checkForUpdates();
}

export function installUpdate() {
  autoUpdater.downloadUpdate();
}
