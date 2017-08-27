import { BrowserWindow } from 'electron';

export default class WindowFactory {
  /**
   * Creates a new window instance
   */
  static async createWindow({ options = {}, url = '/' }) {
    const initialOptions = {
      show: false,
      width: 1024,
      height: 728,
      minWidth: 350,
      minHeight: 300,
      frame: false
    };

    const window = new BrowserWindow(
      Object.assign(initialOptions, options));

    window.loadURL(url);

    return window;
  }
}
