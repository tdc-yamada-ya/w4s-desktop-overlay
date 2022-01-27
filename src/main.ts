import path from "path";
import {app, ipcMain, IpcMainEvent, WebContents} from "electron";
import {createOverlay} from "./main/overlay/createOverlay";
import {createCachedReplicantFactory} from "./lib/electron-replicant/createReplicantCache";
import {createParentReplicant} from "./lib/electron-replicant/createParentReplicant";
import {defaultStore} from "./replicant/store/defaultStore";
import {ReplicantMap} from "./replicant/ReplicantMap";
import {screen} from "electron";
import {createMessageSubscriber} from "./lib/electron-message/createMessageSubscriber";
import {MessageMap} from "./message/messages";
import {openHelp} from "./main/openHelp";
import {createMessageSender} from "./lib/electron-message/createMessageSender";
import {createMainWindow} from "./createMainWindow";
import {initReactDevtool} from "./main/initReactDevtool";
import {dev} from "./dev";
import {OverlayConfig} from "./replicant/OverlayConfig";
import {merge} from "lodash";

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

  const mainWindow = createMainWindow({dev});
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
      const diff: OverlayConfig = {
        layers: {
          [id]: {
            bounds,
          },
        },
      };
      overlayRep.set(merge(overlayRep.get(), diff));
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
