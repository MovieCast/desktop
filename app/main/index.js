import Application from './Application';
import TaskManager from './TaskManager';

Application.bootstrap().then(app => {
  console.log('MovieCast is starting...');

  const taskManager = new TaskManager(app.getStore());
  taskManager.startTasks();

  return 0;
}).catch(Application.onError);
