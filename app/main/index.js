import Application from './Application';
import TaskManager from './TaskManager';
import TorrentEngine from './TorrentEngine';

Application.bootstrap().then(app => {
  console.log('MovieCast is starting...');

  const taskManager = new TaskManager(app.getStore());
  // taskManager.startTasks();

  // TorrentEngine tests
  console.log('Going to run some tests with our TorrentEngine');
  console.log(`TorrentEngine.VERION: ${TorrentEngine.VERSION}`);
  console.log(`TorrentEngine.VERION_STR: ${TorrentEngine.VERSION_STR}`);
  console.log(`TorrentEngine.VERION_PREFIX: ${TorrentEngine.VERSION_PREFIX}`);
  console.log(`TorrentEngine.PEER_ID: ${TorrentEngine.PEER_ID}`);
  console.log('----------------------');
  const torrentEngine = new TorrentEngine(app.getStore());
  torrentEngine.startTorrenting('magnet:?xt=urn:btih:6A02592D2BBC069628CD5ED8A54F88EE06AC0BA5&dn=CosmosLaundromatFirstCycle&tr=http%3a%2f%2fbt1.archive.org%3a6969%2fannounce&tr=http%3a%2f%2fbt2.archive.org%3a6969%2fannounce&tr=wss%3a%2f%2ftracker.btorrent.xyz&tr=wss%3a%2f%2ftracker.openwebtorrent.com&tr=wss%3a%2f%2ftracker.webtorrent.io&ws=http%3a%2f%2fia601508.us.archive.org%2f14%2fitems%2f&ws=http%3a%2f%2fia801508.us.archive.org%2f14%2fitems%2f&ws=https%3a%2f%2farchive.org%2fdownload%2f');

  return 0;
}).catch(Application.onError);
