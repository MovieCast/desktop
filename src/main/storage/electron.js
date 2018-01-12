/* eslint-disable class-methods-use-this */

import storage from 'electron-json-storage';
import * as BlueBirdPromise from 'bluebird';

const storageGet = BlueBirdPromise.promisify(storage.get);
const storageSet = BlueBirdPromise.promisify(storage.set);

export default (key, backup) => {
  class ElectronStorage {
    async load() {
      const storedState = await storageGet(key);

      try {
        return JSON.parse(storedState);
      } catch (err) {
        console.warn('Can\'t parse saved file, will fall back to default config.');
        return {};
      }
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
