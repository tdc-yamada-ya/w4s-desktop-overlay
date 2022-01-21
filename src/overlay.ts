import {BrowserWindow} from "electron";
import {isEqual, omitBy} from "lodash";
import {Bounds, LayerConfig, OverlayConfig} from "./replicant/replicants";

export type Overlay = {
  apply(config?: OverlayConfig): void;
  reload(id: string): void;
};

export const createOverlay = ({dev}: {dev: boolean}): Overlay => {
  let config: OverlayConfig | undefined;
  const layers: {[id: string]: Layer} = {};

  const addLayer = (id: string, c: LayerConfig): void => {
    const l = createLayer({dev});
    l.apply(c);
    layers[id] = l;
  };

  const updateLayer = (id: string, nc: LayerConfig, oc: LayerConfig): void => {
    const l = layers[id];
    if (l) {
      l.apply(omitBy(nc, (v, k) => isEqual(oc[k as keyof LayerConfig], v)));
    }
  };

  const deleteLayer = (id: string): void => {
    const l = layers[id];
    if (l) l.dispose();
    delete layers[id];
  };

  const applyLayer = (id: string, nc?: LayerConfig, oc?: LayerConfig): void => {
    if (!oc && nc) addLayer(id, nc);
    else if (oc && nc) updateLayer(id, nc, oc);
    else if (oc && !nc) deleteLayer(id);
  };

  const apply = (n: OverlayConfig | undefined): void => {
    const oll = config?.layers ?? {};
    const nll = n?.layers ?? {};
    const oIds = Object.keys(oll) ?? [];
    const nIds = Object.keys(nll) ?? [];
    const ids = [...new Set([...oIds, ...nIds])];

    for (const id of ids) {
      applyLayer(id, nll[id], oll[id]);
    }

    config = n;
  };

  const reload = (id: string): void => layers[id]?.reload();

  return {apply, reload};
};

export type Layer = {
  apply(c: LayerConfig): void;
  dispose(): void;
  reload(): void;
};

export const createLayer = ({dev}: {dev: boolean}): Layer => {
  const w = createWindow({dev});

  const setAudioMuted = (audioMuted?: boolean) => {
    if (audioMuted == null) return;
    w.webContents.setAudioMuted(audioMuted);
  };

  const setBounds = (bounds?: Bounds) => {
    if (bounds == null) return;
    w.setBounds(bounds);
  };

  const setOpacity = (opacity?: number) => {
    if (opacity == null) return;
    w.setOpacity(opacity);
  };

  const setURL = (url?: string) => {
    if (url == null) return;
    w.loadURL(url || "about:blank");
  };

  const setVisible = (visible?: boolean) => {
    if (visible == null) return;

    if (visible) {
      w.show();
    } else {
      w.hide();
    }
  };

  const apply = (l: LayerConfig): void => {
    setAudioMuted(l.audioMuted);
    setBounds(l.bounds);
    setOpacity(l.opacity);
    setURL(l.url);
    setVisible(l.visible);
  };

  const dispose = () => w.close();

  const reload = () => w.reload();

  return {apply, dispose, reload};
};

const createWindow = ({dev}: {dev: boolean}): BrowserWindow => {
  const w = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    fullscreen: true,
    opacity: 0.8,
    resizable: false,
    show: false,
    skipTaskbar: true,
    transparent: true,
  });

  w.setAlwaysOnTop(true, "screen-saver");
  w.setVisibleOnAllWorkspaces(true);
  w.setIgnoreMouseEvents(true);
  w.setMenu(null);

  w.webContents.on("did-finish-load", () => {
    w.webContents.insertCSS(
      "html, body { background-color: transparent !important; overflow: hidden !important; }",
    );
  });

  if (dev) w.webContents.openDevTools({mode: "detach"});

  w.loadURL("about:blank");

  return w;
};
