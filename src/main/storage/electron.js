import storage from 'electron-json-storage';
import * as BlueBirdPromise from 'bluebird';

const storageGet = BlueBirdPromise.promisify(storage.get);
const storageSet = BlueBirdPromise.promisify(storage.set);

export default (key, backup) => {
  class ElectronStorage {
    async load() {
      const storedState = await storageGet(key);

      return JSON.parse(storedState);
    }

    async save(state) {
      const jsonState = JSON.stringify(state);

      if (backup !== undefined) {
        await storageSet(`backup.${key}`, jsonState);
        return storageSet(key, jsonState);
      }

      return storageSet(key, jsonState);
    }
  }
  return new ElectronStorage();
};
