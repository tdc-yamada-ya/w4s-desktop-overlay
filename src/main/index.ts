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
import {createMainWindow} from "./createMainWindow";
import {initDevtool} from "./debug/initDevtool";
import {initReload} from "./debug/initReload";
import {dev} from "./dev";
import {initAppProtocol} from "./initAppProtocol";
import {initDefaultProtocolClient} from "./initDefaultProtocolClient";
import {initTitlebar} from "./initTitlebar";
import {openHelp} from "./openHelp";
import {createOverlay} from "./overlay/createOverlay";

const init = async () => {
  if (dev) await initDevtool();

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
    onCommitBounds(id) {
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
  msgSubscriber.on("help", openHelp);
  msgSubscriber.on("version", () =>
    msgSender.send("version", app.getVersion()),
  );

  initAppProtocol({
    sender: msgSender,
    window: mainWindow,
  });

  initTitlebar({
    sender: msgSender,
    subscriber: msgSubscriber,
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

  if (dev) initReload();

  initDefaultProtocolClient();

  app.on("web-contents-created", (_, c) => disableNavigate(c));
  app.on("web-contents-created", (_, c) => disableOpenWindow(c));
  app.whenReady().then(init);
  app.once("window-all-closed", quit);
};

main();
