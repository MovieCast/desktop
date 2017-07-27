/* eslint-disable global-require, import/no-dynamic-require */
import { Menu } from 'electron';

export default class MenuFactory {
  /**
   * Builds a menu based on current os
   * @param {Electron.BrowserWindow} mainWindow
   */
  static makeMenu(mainWindow) {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      MenuFactory.setupDevelopmentEnvironment(mainWindow);
    }
    let template;

    try {
      template = require(`./menus/${process.platform}`);
    } catch (err) {
      template = require('./menus/default');
      console.warn(`${process.platform} isn't officially supported, falling back to default menu!`);
    }

    const menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);

    return menu;
  }

  /**
   * Adds some handy dev tools like inspect element
   * @param {Electron.BrowserWindow} mainWindow
   */
  static setupDevelopmentEnvironment(mainWindow) {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => {
            mainWindow.inspectElement(x, y);
          }
        }])
        .popup(mainWindow);
    });
  }
}
