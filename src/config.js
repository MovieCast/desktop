import arch from 'arch';
import path from 'path';
import electron from 'electron';
import pkg from './package.json';

const appConfig = require('application-config')('MovieCast');

// Url constants
export const HOME_PAGE_URL = 'https://moviecast.io';
export const ANNOUNCEMENT_URL = 'https://api.moviecast.io/announcement';
export const AUTO_UPDATE_URL = 'https://api.moviecast.io/update';
export const CRASH_REPORT_URL = 'https://api.moviecast.io/crash-report';
export const GITHUB_URL = pkg.homepage;
export const GITHUB_URL_ISSUES = pkg.bugs.url;

// App constants
export const APP_NAME = pkg.productName;
export const APP_VERSION = pkg.version;

// Path constants
export const ROOT_PATH = path.join(__dirname, '..');
export const CONFIG_PATH = path.dirname(appConfig.filePath);
export const DEFAULT_DOWNLOAD_PATH = getDefaultDownloadPath();

// Window constants
export const WINDOW_MAIN = getWindowPath('app.html'); // Ples rename to main.html
export const WINDOW_TORRENTENGINE = getWindowPath('torrentEngine.html');

// Generic constants
export const DELAYED_INIT = 3000; /* 3 seconds */
export const OS_SYSARCH = arch() === 'x64' ? 'x64' : 'ia32';

function getDefaultDownloadPath() {
  return getPath('downloads');
}

function getPath(key) {
  if (!process.versions.electron) {
    // Node.js process
    return '';
  } else if (process.type === 'renderer') {
    // Electron renderer process
    return electron.remote.app.getPath(key);
  }

  // Electron main process
  return electron.app.getPath(key);
}

function getWindowPath(key) {
  if (process.env.NODE_ENV === 'development') {
    // This line automatically gets removed yay
    // We all gotta love webpack <3
    return `http://localhost:1212/dist/${key}`;
  }
  return `file://${path.join(__dirname, '..', 'renderer', key)}`;
}
