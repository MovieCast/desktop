module.exports = {
  init
};

function init(force = false) {
  const installer = require('electron-devtools-installer'); // eslint-disable-line global-require
  const forceDownload = force || !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
}
