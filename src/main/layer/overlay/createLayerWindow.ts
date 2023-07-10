import {BrowserWindow} from "electron";

import {Bounds} from "../../../common/replicant/Bounds";
import {isDev} from "../../dev/dev";
import {getLayerSession} from "../session/getLayerSession";
import {setWindowPageWithLayerSourceURL} from "../source/setWindowPageWithLayerSourceURL";
import {LayerWindow} from "./LayerWindow";
import {createSetCSSFunction} from "./createSetCSSFunction";
import {createSetVisibleFunction} from "./createSetVisibleFunction";

export const createLayerWindow = ({
  movable = false,
  onBounds,
  onCommitBounds,
  sessionName,
}: {
  movable?: boolean;
  onBounds?: (bounds: Bounds) => void;
  onCommitBounds?: () => void;
  sessionName: string;
}): LayerWindow => {
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

  const win = new BrowserWindow({
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
      session: getLayerSession(sessionName),
    },
  });

  win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
  win.setVisibleOnAllWorkspaces(true);
  win.setIgnoreMouseEvents(ignoreMouseEvents);
  win.setMenu(null);

  win.webContents.on("did-finish-load", () => {
    win.webContents.insertCSS(
      "html, body, body:before { background: transparent !important; overflow: hidden !important; }",
    );
  });

  if (isDev) win.webContents.openDevTools({mode: "detach"});

  win.on("moved", () => onBounds?.(win.getBounds()));
  win.on("resized", () => onBounds?.(win.getBounds()));
  win.on("close", (e) => {
    e.preventDefault();
    onCommitBounds?.();
  });

  win.loadURL("about:blank");

  return {
    destroy() {
      win.destroy();
    },
    setCSS: createSetCSSFunction(win),
    reload() {
      win.reload();
    },
    setAudioMuted(v) {
      win.webContents.setAudioMuted(v);
    },
    setBounds({x, y, height, width}) {
      win.setBounds({
        x: Math.floor(x ?? 0),
        y: Math.floor(y ?? 0),
        height: Math.floor(height ?? 0),
        width: Math.floor(width ?? 0),
      });
    },
    setOpacity(v) {
      win.setOpacity(movable ? 0.9 : v);
    },
    setURL(v) {
      setWindowPageWithLayerSourceURL(win, v);
    },
    setVisible: createSetVisibleFunction(win),
    setAllowUserMedia(v: boolean) {
      const sess = win.webContents.session;
      sess.setPermissionRequestHandler((_webContents, _permission, callback) =>
        callback(v),
      );
    },
  };
};
