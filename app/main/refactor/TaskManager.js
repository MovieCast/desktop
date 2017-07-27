import autoUpdater from './tasks/autoUpdater';

export default class Tasks {
  constructor(store) {
    this.store = store;
  }

  startTasks() {
    autoUpdater(this.store);
  }
}
