import AppDispatcher from "../dispatchers/AppDispatcher";

export const ElectronActionTypes = {
  MINIMIZE: 'electron/minimize',
  MINIMIZED: 'electron/minimized',
  MAXIMIZE: 'electron/maximize',
  MAXIMIZED: 'electron/maximized',
  CLOSE: 'electron/close'
};

export default {
  minimize() {
    AppDispatcher.dispatch({
      type: ElectronActionTypes.MINIMIZE
    });
  },

  maximize() {
    AppDispatcher.dispatch({
      type: ElectronActionTypes.MAXIMIZE
    });
  },
  close() {
    AppDispatcher.dispatch({
      type: ElectronActionTypes.CLOSE
    })
  }
}