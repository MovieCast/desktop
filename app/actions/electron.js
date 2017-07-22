import { remote, ipcRenderer } from 'electron';

export const WINDOW_MAXIMIZE = 'WINDOW_MAXIMIZE';
export const WINDOW_MINIMIZE = 'WINDOW_MINIMIZE';
export const WINDOW_CLOSE = 'WINDOW_CLOSE';
export const WINDOW_FULLSCREEN = 'WINDOW_FULLSCREEN';
export const WINDOW_RESIZE = 'WINDOW_RESIZE';


ipcRenderer.on('resize', (event) => {
  console.log(event);
});

export function maximize() {
  return (dispatch, getState) => {
    const window = remote.getCurrentWindow();
    const { electron: { maximized } } = getState();

    if (maximized) {
      window.unmaximize();
    } else {
      window.maximize();
    }

    dispatch({
      type: WINDOW_MAXIMIZE,
      payload: window.isMaximized()
    });
  };
}

export function minimize() {
  return (dispatch, getState) => {
    const window = remote.getCurrentWindow();
    const { electron: { minimized } } = getState();

    if (!minimized) {
      window.minimize();
    }

    dispatch({
      type: WINDOW_MINIMIZE,
      payload: window.isMinimized()
    });
  };
}

// This might get a little bit weird
// we are going to try and change
// the state while we know we are exited
export function close() {
  const window = remote.getCurrentWindow();
  window.close();

  return {
    type: WINDOW_CLOSE,
  };
}

export function fullscreen() {
  return {
    type: WINDOW_FULLSCREEN
  };
}

export function resize() {
  return {
    type: WINDOW_RESIZE
  };
}
