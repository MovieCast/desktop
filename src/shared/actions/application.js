import { makeActionCreator } from '../util';

export const CONFIGURE_APP_BAR = 'CONFIGURE_APP_BAR';
export const CONFIGURE_TITLE_BAR = 'CONFIGURE_TITLE_BAR';

// TODO: Find a way to validate the 'options' param
export const configureAppBar = makeActionCreator(CONFIGURE_APP_BAR, 'payload');

export const configureTitleBar = makeActionCreator(CONFIGURE_TITLE_BAR, 'payload');

