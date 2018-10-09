import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow;

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = false;

app.on('ready', async (e) => {
  const splashWindow = createSplashScreen();
  setTimeout(() => createWindow(splashWindow), 3000);   //Just adding a VERY small delay so this actually shows: Smooth loading is better than fast loading.
  
  if(isDevelopment) {
    await (require('./extensions')).init();
  }

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

async function createWindow(splashWindow) {
  
  // Create the browser window...
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    minWidth: 640, minHeight: 395,
  
    backgroundColor: "#fcfcfc",
    center: true,
    show: false,
    frame: false,
    title: "MovieCast",
    vibrancy: "appearance-based"
  });

  // ...and load the index.html of the app
  
  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    mainWindow.loadURL(url.format({
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
    splashWindow.close();
  });

  mainWindow.on("closed", () => mainWindow = null);
}

function createSplashScreen() {
  const splash = {
    center: true,
    show: false,
    frame: false,
    width: 400, height: 400,
    transparent: true,
  };

  const splashWindow = new BrowserWindow(splash);

  if (isDevelopment) {
    splashWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/splash.html`)
  } else {
    splashWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../static/splash.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  splashWindow.once("ready-to-show", () => {
    splashWindow.show();
  });

  return splashWindow;
}