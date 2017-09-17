import { makeActionCreator } from '../util';

export const CONFIGURE_APP_BAR = 'CONFIGURE_APP_BAR';

// TODO: Find a way to validate the 'options' param
export const configureAppBar = makeActionCreator(CONFIGURE_APP_BAR, 'payload');
