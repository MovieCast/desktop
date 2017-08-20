export const CONFIGURE_APP_BAR = 'CONFIGURE_APP_BAR';

// TODO: Find a way to validate the 'options' param
export function configureAppBar(options) {
  if (options && options.title) {
    console.error('The \'title\' property is deprecated, please use the \'secondary\' instead');
    return;
  }

  return {
    type: CONFIGURE_APP_BAR,
    payload: options,
    meta: {
      scope: 'local'
    }
  };
}
