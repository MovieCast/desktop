import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import * as devtron from 'devtron';
import * as logger from './logger';

module.exports = {
  init
};

function init(force = false) {
  // devtron.install();

  const forceDownload = force || !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  ];

  Promise
    .all(extensions.map(name => installExtension(name, forceDownload)))
    .then(data => logger.info('extensions: Installed the following extensions', data))
    .catch(console.log);
}
