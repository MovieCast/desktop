import { remote } from 'electron';
import { WINDOW_MAXIMIZE, WINDOW_MINIMIZE } from '../actions/electron';

// Is this the best way to do it? idk...
const window = remote.getCurrentWindow();

const INITIAL_STATE = {
  maximized: window.isMaximized(),
  minimized: window.isMinimized()
};

// TODO: Here we will save the state of electron
// Think of window state, height, width, etc.
export default function electron(state = INITIAL_STATE, action) {
  switch (action.type) {
    case WINDOW_MAXIMIZE:
      return { ...state, maximized: action.payload };
    case WINDOW_MINIMIZE:
      return { ...state, minimized: action.payload };
    default:
      return state;
  }
}
