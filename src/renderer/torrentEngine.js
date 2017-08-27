
import { ipcRenderer as ipc } from 'electron';
import { getInitialStateRenderer } from 'electron-redux';
import StoreFactory, { SCOPE_RENDERER } from '../shared/store/StoreFactory';
import TorrentEngine from '../main/TorrentEngine';

console.time('init');

const storeFactory = new StoreFactory(SCOPE_RENDERER);
const store = storeFactory.configureStore(getInitialStateRenderer());

console.log('--------------------------------------------');
console.log('MovieCast TorrentEngine Info');
console.log('--------------------------------------------');
console.log(`TorrentEngine.VERION: ${TorrentEngine.VERSION}`);
console.log(`TorrentEngine.VERION_STR: ${TorrentEngine.VERSION_STR}`);
console.log(`TorrentEngine.VERION_PREFIX: ${TorrentEngine.VERSION_PREFIX}`);
console.log(`TorrentEngine.PEER_ID: ${TorrentEngine.PEER_ID}`);
console.log('--------------------------------------------');
const torrentEngine = new TorrentEngine(store);

init();

function init() {
  ipc.on('addTorrent', (event, torrentKey, torrentID, path, fileModtimes, selections) => {
    console.log('addTorrent');
    torrentEngine.addTorrent(torrentKey, torrentID, path, fileModtimes, selections);
  });

  ipc.on('removeTorrent', (event, torrentID) => {
    torrentEngine.removeTorrent(torrentID);
  });

  ipc.on('startStreamServer', (event, torrentID) => {
    torrentEngine.startStreamServer(torrentID);
  });

  ipc.on('stopStreamServer', () => {
    torrentEngine.stopStreamServer();
  });

  console.timeEnd('init');
}

// Now connect IPC with TorrentEngine, TorrentEngine will no longer have access to store!
