import { ReduceStore } from 'flux/utils';
import { remote } from 'electron';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ElectronActionTypes } from '../actions/ElectronActions';

const window = remote.getCurrentWindow();

class ElectronStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);

    this.registerListeners();
  }

  getInitialState() {
    return {
      maximized: window.isMaximized(),
      minimized: window.isMinimized(),
    };
    // return new Immutable.fromJS({
    //   maximized: window.isMaximized(),
    //   minimized: window.isMinimized(),
    // });
  }

  registerListeners() {
    ['maximize', 'unmaximize'].forEach(event => {
      window.on(event, () => {
        AppDispatcher.dispatch({
          type: ElectronActionTypes.MAXIMIZED,
          payload: window.isMaximized()
        });
      });
    });

    ['minimize', 'restore'].forEach(event => {
      window.on(event, () => {
        AppDispatcher.dispatch({
          type: ElectronActionTypes.MINIMIZED,
          payload: window.isMinimized()
        });
      });
    });
  }

  handleMaximize(state) {
    if(state.maximized) {
      window.unmaximize();
    } else {
      window.maximize();
    }
    return state;
  }

  handleMinimize(state) {
    if(!state.minimized) {
      window.minimize();
    }
    return state;
  }

  handleClose(state) {
    window.close();

    return state;
  }

  reduce(state, action) {
    switch(action.type) {
      case ElectronActionTypes.MAXIMIZE:
        return this.handleMaximize(state);

      case ElectronActionTypes.MINIMIZE:
        return this.handleMinimize(state);

      case ElectronActionTypes.CLOSE:
        return this.handleClose(state);

      case ElectronActionTypes.MAXIMIZED:
        return {
          ...state,
          maximized: action.payload
        };//state.set('maximized', action.payload);

      case ElectronActionTypes.MINIMIZED:
        return {
          ...state,
          minimized: action.payload
        };
        //return state.set('minimized', action.payload);

      default:
        return state;
    }
  }
}

export default new ElectronStore();