import {setupTitlebar} from "custom-electron-titlebar/main";
import {IpcMainEvent, WebContents, app, ipcMain} from "electron";
import {screen} from "electron";

import {createMessageSender} from "../common/lib/electron-message/createMessageSender";
import {createMessageSubscriber} from "../common/lib/electron-message/createMessageSubscriber";
import {createParentReplicant} from "../common/lib/electron-replicant/createParentReplicant";
import {createCachedReplicantFactory} from "../common/lib/electron-replicant/createReplicantCache";
import {updateLayerBounds} from "../common/logic/updateLayerBounds";
import {updateLayerLayoutingMode} from "../common/logic/updateLayerLayoutingMode";
import {MessageMap} from "../common/message/MessageMap";
import {ReplicantMap} from "../common/replicant/ReplicantMap";
import {defaultStore} from "../common/replicant/store/defaultStore";
import {initAppMenu} from "./appMenu/initAppMenu";
import {initAppProtocol} from "./appProtocol/initAppProtocol";
import {initDefaultProtocolClient} from "./appProtocol/initDefaultProtocolClient";
import {createMainWindow} from "./createMainWindow";
import {isDev} from "./dev/dev";
import {initDevtool} from "./dev/initDevtool";
import {initReload} from "./dev/initReload";
import {createOverlay} from "./layer/overlay/createOverlay";
import {createLayerSettingsWindowManager} from "./layer/settings/createLayerSettingsWindowManager";

const init = async () => {
  setupTitlebar();
  initAppMenu();

  if (isDev) await initDevtool();

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
  const layerSettingsWindowManager = createLayerSettingsWindowManager({
    layers: (id) => overlayRep.get()?.layers?.[id],
    parentWindow: () => mainWindow,
  });

  overlayRep.set({
    ...{
      layers: {},
    },
    ...overlayRep.get(),
  });

  const overlay = createOverlay({
    onBounds(id, bounds) {
      overlayRep.set(updateLayerBounds(overlayRep.get(), id, bounds));
    },
    onBoundsChangeCommitted(id) {
      overlayRep.set(updateLayerLayoutingMode(overlayRep.get(), id, false));
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
  msgSubscriber.on("version", () =>
    msgSender.send("version", app.getVersion()),
  );
  msgSubscriber.on("showLayerSettingsWindow", (_, id) => {
    layerSettingsWindowManager.show(id);
  });

  initAppProtocol({
    sender: msgSender,
    window: mainWindow,
  });
};

const quit = () => app.quit();

const disableNavigate = (contents: WebContents) =>
  contents.on("will-navigate", (event: Event) => event.preventDefault());

const disableOpenWindow = (contents: WebContents) =>
  contents.setWindowOpenHandler(() => ({action: "deny"}));

const main = () => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    console.log("This app is already up and running.");
    app.quit();
    return;
  }

  if (isDev) initReload();

  initDefaultProtocolClient();

  app.whenReady().then(init);
  app.on("web-contents-created", (_, contents) => {
    disableNavigate(contents);
    disableOpenWindow(contents);
  });
  app.once("window-all-closed", quit);
};

main();
