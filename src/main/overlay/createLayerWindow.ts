import {BrowserWindow, session} from "electron";
import {v4 as uuid} from "uuid";
import {dev} from "../../dev";
import {Bounds} from "../../replicant/Bounds";
import {LayerWindow} from "./LayerWindow";

export const createLayerWindow = ({
  movable,
  onBounds,
}: {
  movable?: boolean;
  onBounds: (bounds: Bounds) => void;
}): LayerWindow => {
  const ses = session.fromPartition(uuid());

  ses.setPermissionRequestHandler((_webContents, _permission, callback) =>
    callback(false),
  );

  const {
    alwaysOnTop,
    frame,
    fullscreen,
    resizable,
    skipTaskbar,
    transparent,
    ignoreMouseEvents,
  } = movable
    ? {
        alwaysOnTop: false,
        frame: true,
        fullscreen: false,
        resizable: true,
        skipTaskbar: false,
        transparent: false,
        ignoreMouseEvents: false,
      }
    : {
        alwaysOnTop: true,
        frame: false,
        fullscreen: true,
        resizable: false,
        skipTaskbar: true,
        transparent: true,
        ignoreMouseEvents: true,
      };

  const w = new BrowserWindow({
    alwaysOnTop,
    closable: false,
    frame,
    fullscreen,
    maximizable: false,
    minimizable: false,
    resizable,
    skipTaskbar,
    opacity: 0.8,
    show: false,
    transparent,
    webPreferences: {
      sandbox: true,
      session: ses,
    },
  });

  w.setAlwaysOnTop(alwaysOnTop, "screen-saver");
  w.setVisibleOnAllWorkspaces(true);
  w.setIgnoreMouseEvents(ignoreMouseEvents);
  w.setMenu(null);

  w.webContents.on("did-finish-load", () => {
    w.webContents.insertCSS(
      "html, body { background-color: transparent !important; overflow: hidden !important; }",
    );
  });

  if (dev) w.webContents.openDevTools({mode: "detach"});

  w.loadURL("about:blank");

  w.on("moved", () => onBounds(w.getBounds()));
  w.on("resized", () => onBounds(w.getBounds()));

  return {
    destroy() {
      w.destroy();
    },
    reload() {
      w.reload();
    },
    setAudioMuted(v) {
      w.webContents.setAudioMuted(v);
    },
    setBounds(v) {
      w.setBounds(v);
    },
    setOpacity(v) {
      w.setOpacity(movable ? 0.8 : v);
    },
    setURL(v) {
      w.loadURL(v);
    },
    setVisible(v) {
      if (v) w.show();
      else w.hide();
    },
  };
};
