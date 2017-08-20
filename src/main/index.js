import Application from './Application';
import TaskManager from './TaskManager';
import TorrentEngine from './TorrentEngine';

Application.bootstrap().then(app => {
  console.log('MovieCast is starting...');
  console.log('Starting tasks...');
  const taskManager = new TaskManager(app.getStore());
  taskManager.init();

  // The Torrent Engine
  console.log();
  console.log('--------------------------------------------');
  console.log('MovieCast TorrentEngine Info');
  console.log('--------------------------------------------');
  console.log(`TorrentEngine.VERION: ${TorrentEngine.VERSION}`);
  console.log(`TorrentEngine.VERION_STR: ${TorrentEngine.VERSION_STR}`);
  console.log(`TorrentEngine.VERION_PREFIX: ${TorrentEngine.VERSION_PREFIX}`);
  console.log(`TorrentEngine.PEER_ID: ${TorrentEngine.PEER_ID}`);
  console.log('--------------------------------------------');
  global.torrentEngine = new TorrentEngine(app.getStore());

  return 0;
}).catch(Application.onError);

function testSomeFunction() {
  console.log('ekekekeke');
}

process.on('uncaughtException', Application.onError);
