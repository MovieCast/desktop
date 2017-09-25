import { app } from 'electron';
import autoUpdater from './tasks/autoUpdater';

export default class Tasks {
  constructor(store) {
    this.store = store;
  }

  init() {
    if (app.isReady) this.startTasks();
    else { app.once('ready', this.startTasks); }
  }

  startTasks = () => {
    if (process.env.NODE_ENV === 'production') {
      autoUpdater(this.store);
    }
  }
}
