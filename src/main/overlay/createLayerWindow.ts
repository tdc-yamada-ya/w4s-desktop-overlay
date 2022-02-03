import {BrowserWindow, session} from "electron";
import {v4 as uuid} from "uuid";

import {dev} from "../../dev";
import {Bounds} from "../../replicant/Bounds";
import {LayerWindow} from "./LayerWindow";

export const createLayerWindow = ({
  movable = false,
  onBounds,
  onCommitBounds,
}: {
  movable?: boolean;
  onBounds?: (bounds: Bounds) => void;
  onCommitBounds?: () => void;
}): LayerWindow => {
  const ses = session.fromPartition(uuid());

  ses.setPermissionRequestHandler((_webContents, _permission, callback) =>
    callback(false),
  );

  const {
    alwaysOnTop,
    closable,
    frame,
    fullscreen,
    resizable,
    skipTaskbar,
    transparent,
    ignoreMouseEvents,
  } = movable
    ? {
        alwaysOnTop: false,
        closable: true,
        frame: true,
        fullscreen: false,
        resizable: true,
        skipTaskbar: false,
        transparent: false,
        ignoreMouseEvents: false,
      }
    : {
        alwaysOnTop: true,
        closable: false,
        frame: false,
        fullscreen: true,
        resizable: false,
        skipTaskbar: true,
        transparent: true,
        ignoreMouseEvents: true,
      };

  const w = new BrowserWindow({
    alwaysOnTop,
    closable,
    frame,
    fullscreen,
    maximizable: false,
    minimizable: false,
    resizable,
    skipTaskbar,
    opacity: 0.9,
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

  w.loadFile("dist/layer.html");

  w.on("moved", () => onBounds?.(w.getBounds()));
  w.on("resized", () => onBounds?.(w.getBounds()));
  w.on("close", (e) => {
    e.preventDefault();
    onCommitBounds?.();
  });

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
      w.setOpacity(movable ? 0.9 : v);
    },
    setURL(v) {
      if (v) {
        w.loadURL(v);
      } else {
        w.loadFile("dist/layer.html");
      }
    },
    setVisible(v) {
      if (v) w.show();
      else w.hide();
    },
  };
};
