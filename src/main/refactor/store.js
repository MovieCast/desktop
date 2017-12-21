/* eslint-disable */

import StoreFactory, { SCOPE_MAIN } from '../../shared/store/StoreFactory';

global.state = {};

export function load(cb) {
  const storeFactory = new StoreFactory(SCOPE_MAIN);
  const store = storeFactory.configureStore();

  cb(null, store);
}
