import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow;

app.on('ready', () => {

  createWindow();

  app.on("activate", () => {
    // Re-create a window in the app when the dock icon
    // is clicked and there are no other windows open
    if (!mainWindow) return createWindow();
  });

  app.on("will-finish-launching", () => {
    // You would usually set up listeners for the `open-file` and `open-url`
    // events here, and start the crash reporter and auto updater
  });

  app.on("window-all-closed", () => {
    // if (process.platform !== "darwin") return app.quit();
    return app.quit();
  });
});

function createWindow() {
  // Create the browser window...
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    minWidth: 640, minHeight: 395,
  
    backgroundColor: "#fcfcfc",
    center: true,
    show: false,
    title: "MovieCast",
    vibrancy: "appearance-based"
  });

  // ...and load the index.html of the app
  
  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    mainWindow.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => mainWindow = null);
}