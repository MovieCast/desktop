export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export const RESET_SETTINGS = 'RESET_SETTINGS';

export function changeSettings(settings) {
  return {
    type: CHANGE_SETTINGS,
    payload: settings
  };
}

export function resetSettings(settings) {
  return {
    type: RESET_SETTINGS,
    payload: settings
  };
}
