import { GET_SETTINGS, SAVE_SETTINGS } from '../actions/settings';

// TODO: Create some fancy actions to change settings, oh and uhm save them!
export default function movies(state = {}, action) {
  switch (action.type) {
    case GET_SETTINGS:
    case SAVE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}
