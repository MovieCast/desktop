import { autoUpdater as updater } from 'electron-updater';
import {
  checkingForUpdate,
  updateAvailable,
  updateDownloading,
  updateNotAvailable,
  updateError,
  updateDownloaded
} from '../../shared/actions/updater';

export default function autoUpdater(store) {
  console.log('Starting Auto Updater');

  updater.on('checking-for-update', () => {
    store.dispatch(checkingForUpdate());
  });
  updater.on('update-available', (info) => {
    store.dispatch(updateAvailable());
    console.log(info);
  });
  updater.on('update-not-available', (info) => {
    store.dispatch(updateNotAvailable());
    console.log(info);
  });
  updater.on('error', (err) => {
    store.dispatch(updateError(err));
  });
  updater.on('download-progress', (progressObj) => {
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
    console.log(logMessage);

    store.dispatch(updateDownloading(progressObj.percent));
  });
  updater.on('update-downloaded', (info) => {
    store.dispatch(updateDownloaded());
    console.log(info);
  });

  updater.checkForUpdates();
}
