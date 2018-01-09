/* eslint-disable */

import StoreFactory, { SCOPE_MAIN } from '../shared/store/StoreFactory';

import createStorage from './storage/electron';

import { storageLoad, storageSave } from '../shared/actions/storage';

const electronStorage = createStorage('state');

global.state = {};
let store;

export async function load() {
  store = new StoreFactory(SCOPE_MAIN).configureStore();

  const savedState = await electronStorage.load();
  store.dispatch(storageLoad(savedState));

  return store;
}

export async function save() {
  store.dispatch(storageSave);
  return electronStorage.save(store.getState());
}