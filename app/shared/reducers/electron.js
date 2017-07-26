import { WINDOW_MAXIMIZE, WINDOW_MINIMIZE } from '../actions/electron';

// TODO: Here we will save the state of electron
// Think of window state, height, width, etc.
export default function electron(state = {}, action) {
  switch (action.type) {
    case WINDOW_MAXIMIZE:
      return { ...state, maximized: action.payload };
    case WINDOW_MINIMIZE:
      return { ...state, minimized: action.payload };
    default:
      return state;
  }
}
