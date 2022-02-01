import {IpcMainEvent, WebContents, app, ipcMain} from "electron";
import {screen} from "electron";
import path from "path";

import {createMainWindow} from "./createMainWindow";
import {dev} from "./dev";
import {createMessageSender} from "./lib/electron-message/createMessageSender";
import {createMessageSubscriber} from "./lib/electron-message/createMessageSubscriber";
import {createParentReplicant} from "./lib/electron-replicant/createParentReplicant";
import {createCachedReplicantFactory} from "./lib/electron-replicant/createReplicantCache";
import {updateLayerBounds} from "./logic/updateLayerBounds";
import {initReactDevtool} from "./main/initReactDevtool";
import {openHelp} from "./main/openHelp";
import {createOverlay} from "./main/overlay/createOverlay";
import {MessageMap} from "./message/MessageMap";
import {ReplicantMap} from "./replicant/ReplicantMap";
import {defaultStore} from "./replicant/store/defaultStore";

if (dev) {
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

const init = async () => {
  if (dev) await initReactDevtool();

  const mainWindow = createMainWindow();
  const repFactory = createCachedReplicantFactory<ReplicantMap>({
    createReplicant: (name) =>
      createParentReplicant(name, {
        persistence: defaultStore,
        senders: () => [mainWindow.webContents],
        subscriber: ipcMain,
      }),
  });
  const overlayRep = repFactory.createReplicant("overlay");
  const screenRep = repFactory.createReplicant("screen");
  const overlay = createOverlay({
    onBounds(id, bounds) {
      overlayRep.set(updateLayerBounds(overlayRep.get(), id, bounds));
    },
  });

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

  const msgSender = createMessageSender<MessageMap>({
    sender: mainWindow.webContents,
  });
  const msgSubscriber = createMessageSubscriber<MessageMap, IpcMainEvent>({
    subscriber: ipcMain,
  });

  msgSubscriber.on("reload", (_, id) => overlay.reload(id));
  msgSubscriber.on("help", openHelp);
  msgSubscriber.on("version", () =>
    msgSender.send("version", app.getVersion()),
  );
};

const quit = () => app.quit();

const disableNavigate = (_: unknown, contents: WebContents) =>
  contents.on("will-navigate", (event: Event) => event.preventDefault());

const disableOpenWindow = (_: unknown, contents: WebContents) =>
  contents.setWindowOpenHandler(() => ({action: "deny"}));

app.on("web-contents-created", disableNavigate);
app.on("web-contents-created", disableOpenWindow);
app.whenReady().then(init);
app.once("window-all-closed", quit);
