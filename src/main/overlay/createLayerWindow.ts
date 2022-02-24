import {BrowserWindow, session} from "electron";
import {v4 as uuid} from "uuid";

import {Bounds} from "../../common/replicant/Bounds";
import {dev} from "../dev";
import {LayerWindow} from "./LayerWindow";

const createSetCSS = (w: BrowserWindow) => {
  let key = "";
  let css = "";

  const refresh = () => {
    w.webContents.removeInsertedCSS(key);
    w.webContents.insertCSS(css).then((v) => (key = v));
  };

  w.webContents.on("dom-ready", () => {
    refresh();
  });

  return (v: string) => {
    css = v;
    refresh();
  };
};

const createSetVisible = (w: BrowserWindow) => {
  let visible = false;
  let ready = false;

  const refresh = () => {
    if (ready && visible) w.show();
    else w.hide();
  };

  w.webContents.on("did-start-navigation", (_e, _u, isInPlace, isMainFrame) => {
    if (isInPlace || !isMainFrame) return;
    ready = false;
    refresh();
  });

  w.webContents.on("did-finish-load", () => {
    ready = true;
    refresh();
  });

  return (v: boolean) => {
    visible = v;
    refresh();
  };
};

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
      "html, body, body:before { background: transparent !important; overflow: hidden !important; }",
    );
  });

  if (dev) w.webContents.openDevTools({mode: "detach"});

  w.loadFile("dist/renderer/widgets/default/index.html");

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
    setCSS: createSetCSS(w),
    reload() {
      w.reload();
    },
    setAudioMuted(v) {
      w.webContents.setAudioMuted(v);
    },
    setBounds({x, y, height, width}) {
      w.setBounds({
        x: Math.floor(x ?? 0),
        y: Math.floor(y ?? 0),
        height: Math.floor(height ?? 0),
        width: Math.floor(width ?? 0),
      });
    },
    setOpacity(v) {
      w.setOpacity(movable ? 0.9 : v);
    },
    setURL(v) {
      if (v) {
        w.loadURL(v);
      } else {
        w.loadFile("dist/renderer/widgets/default/index.html");
      }
    },
    setVisible: createSetVisible(w),
  };
};
