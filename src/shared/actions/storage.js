import { makeActionCreator } from '../util';

export const STORAGE_SAVE = 'STORAGE_SAVE';
export const STORAGE_LOAD = 'STORAGE_LOAD';

export const storageLoad = makeActionCreator(STORAGE_LOAD, 'payload');
export const storageSave = makeActionCreator(STORAGE_SAVE);
