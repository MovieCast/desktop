export const GET_SETTINGS = 'get_settings';
export const SAVE_SETTINGS = 'save_settings';

const INIT_SETTINGS = {
  api: 'scraper1.moviecast.xyz'
};

export function getSettings() {
  // TODO: Yea uhmm, idk how to save the settings yet..
  return {
    type: GET_SETTINGS,
    payload: INIT_SETTINGS
  };
}

export function saveSettings(settings) {
  // TODO: Actually save meh
  return {
    type: SAVE_SETTINGS,
    payload: settings
  };
}
