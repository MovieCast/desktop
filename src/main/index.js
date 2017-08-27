import Application from './Application';
import TaskManager from './TaskManager';
import TorrentEngine from './TorrentEngine';

Application.bootstrap().then(app => {
  console.log('MovieCast is starting...');
  console.log('Starting tasks...');
  const taskManager = new TaskManager(app.getStore());
  taskManager.init();

  return 0;
}).catch(Application.onError);

process.on('uncaughtException', Application.onError);
