import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
import * as logger from './logger';

installExtension(REACT_DEVELOPER_TOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));

module.exports = {
  init
};

function init(force = false) {
  // const forceDownload = force || !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
  ];

  Promise
    .all(extensions.map(name => installExtension(name, force)))
    .then(logger.info)
    .catch(console.log);
}
