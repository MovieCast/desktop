import { BrowserWindow } from 'electron';

export default class WindowFactory {
  /**
   * Creates a main window instance
   */
  static async createMainWindow({ options = {}, url = '/' }) {
    const initialOptions = {
      show: false,
      width: 1024,
      height: 728,
      minWidth: 350,
      minHeight: 300,
      frame: false
    };

    const mainWindow = new BrowserWindow(
      Object.assign(initialOptions, options));

    mainWindow.loadURL(url);

    return mainWindow;
  }
}
