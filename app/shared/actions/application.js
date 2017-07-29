export const CONFIGURE_APP_BAR = 'CONFIGURE_APP_BAR';

// TODO: Find a way to validate the 'options' param
export function configureAppBar(options) {
  return {
    type: CONFIGURE_APP_BAR,
    payload: options,
    meta: {
      scope: 'local'
    }
  };
}
