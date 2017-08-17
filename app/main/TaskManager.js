import { app } from 'electron';
import autoUpdater from './tasks/autoUpdater';

export default class Tasks {
  constructor(store) {
    this.store = store;
  }

  init() {
    app.on('ready', this.startTasks);
  }

  startTasks = () => {
    if (process.NODE_ENV === 'production') {
      autoUpdater(this.store);
    }
  }
}
