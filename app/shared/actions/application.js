export const CUSTOM_TITLE = 'CUSTOM_TITLE';

export function setCustomTitle(title) {
  return {
    type: CUSTOM_TITLE,
    payload: title
  };
}
