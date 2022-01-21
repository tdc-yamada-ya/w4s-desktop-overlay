import path from "path";
import {BrowserWindow, app, session, ipcMain, IpcMainEvent} from "electron";
import {searchDevtools} from "electron-search-devtools";
import {createOverlay} from "./overlay";
import {createCachedReplicantFactory} from "./lib/ts-electron-replicant/createReplicantCache";
import {createParentReplicant} from "./lib/ts-electron-replicant/createParentReplicant";
import {store} from "./replicant/store/store";
import {ReplicantMap} from "./replicant/replicants";
import {screen} from "electron";
import {createMessageSubscriber} from "./lib/ts-electron-message/createMessageSubscriber";
import {MessageMap} from "./message/messages";
import {openHelp} from "./main/openHelp";
import {createMessageSender} from "./lib/ts-electron-message/createMessageSender";

const isDev = process.env["NODE_ENV"] === "development";

if (isDev) {
  const execPath =
    process.platform === "win32"
      ? "../node_modules/electron/dist/electron.exe"
      : "../node_modules/.bin/electron";

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, execPath),
    appArgv: process.argv,
    forceHardReset: true,
    hardResetMethod: "exit",
  });
}

const destroyAllWindows = () =>
  BrowserWindow.getAllWindows().forEach((w) => w.destroy());

const createMainWindow = () => {
  const w = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  w.setMenu(null);
  w.on("closed", destroyAllWindows);

  if (isDev) w.webContents.openDevTools({mode: "detach"});

  w.loadFile("dist/index.html");

  return w;
};

const quit = () => app.quit();

const initReactDevtool = async () => {
  const devtool = await searchDevtools("REACT", {browser: "google-chrome"});
  if (devtool) {
    await session.defaultSession.loadExtension(devtool, {
      allowFileAccess: true,
    });
  }
};

const init = async () => {
  if (isDev) await initReactDevtool();

  const mainWindow = createMainWindow();

  const replicantFactory = createCachedReplicantFactory<ReplicantMap>({
    createReplicant: (name) =>
      createParentReplicant(name, {
        persistence: store,
        senders: () => [mainWindow.webContents],
        subscriber: ipcMain,
      }),
  });

  const overlayRep = replicantFactory.createReplicant("overlay");
  const screenRep = replicantFactory.createReplicant("screen");

  const overlay = createOverlay({dev: isDev});

  overlayRep.subscribe((n) => overlay.apply(n));

  const refreshScreenReplicant = () =>
    screenRep.set({
      displays: screen.getAllDisplays().map((d) => ({bounds: {...d.bounds}})),
    });

  screen
    .on("display-added", refreshScreenReplicant)
    .on("display-metrics-changed", refreshScreenReplicant)
    .on("display-removed", refreshScreenReplicant);

  refreshScreenReplicant();

  const messageSender = createMessageSender<MessageMap>({
    sender: mainWindow.webContents,
  });
  const messageSubscriber = createMessageSubscriber<MessageMap, IpcMainEvent>({
    subscriber: ipcMain,
  });

  messageSubscriber.on("reload", (_, id) => overlay.reload(id));
  messageSubscriber.on("help", openHelp);
  messageSubscriber.on("version", () =>
    messageSender.send("version", app.getVersion()),
  );
};

app.whenReady().then(init);
app.once("window-all-closed", quit);
