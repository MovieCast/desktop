
import { ipcRenderer as ipc } from 'electron';
import TorrentEngine from '../main/TorrentEngine';

console.time('init');

console.log('--------------------------------------------');
console.log('MovieCast TorrentEngine Info');
console.log('--------------------------------------------');
console.log(`TorrentEngine.VERION: ${TorrentEngine.VERSION}`);
console.log(`TorrentEngine.VERION_STR: ${TorrentEngine.VERSION_STR}`);
console.log(`TorrentEngine.VERION_PREFIX: ${TorrentEngine.VERSION_PREFIX}`);
console.log(`TorrentEngine.PEER_ID: ${TorrentEngine.PEER_ID}`);
console.log('--------------------------------------------');
const torrentEngine = new TorrentEngine();

init();

function init() {
  ipc.on('te-addTorrent', (event, torrentKey, torrentID, path, fileModtimes, selections) => {
    console.log('addTorrent');
    torrentEngine.addTorrent(torrentKey, torrentID, path, fileModtimes, selections);
  });

  ipc.on('te-removeTorrent', (event, torrentID) => {
    torrentEngine.removeTorrent(torrentID);
  });

  ipc.on('te-startStreamServer', (event, torrentID) => {
    torrentEngine.startStreamServer(torrentID);
  });

  ipc.on('te-stopStreamServer', () => {
    torrentEngine.stopStreamServer();
  });

  // torrentEngine.on('torrent-progress')

  console.timeEnd('init');
}

// Now connect IPC with TorrentEngine, TorrentEngine will no longer have access to store!
