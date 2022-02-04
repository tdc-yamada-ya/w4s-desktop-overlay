import {Color, Titlebar} from "custom-electron-titlebar";
import {contextBridge, ipcRenderer} from "electron";

import {API} from "./api";
import {createMessageSender} from "./lib/electron-message/createMessageSender";
import {createMessageSubscriber} from "./lib/electron-message/createMessageSubscriber";
import {createChildReplicant} from "./lib/electron-replicant/createChildReplicant";
import {createCachedReplicantFactory} from "./lib/electron-replicant/createReplicantCache";
import {MessageMap} from "./message/MessageMap";
import {LayerConfig} from "./replicant/LayerConfig";
import {ReplicantMap} from "./replicant/ReplicantMap";

const repFactory = createCachedReplicantFactory<ReplicantMap>({
  createReplicant: (name) => {
    return createChildReplicant(name, {
      sender: ipcRenderer,
      subscriber: ipcRenderer,
    });
  },
});
const msgSender = createMessageSender<MessageMap>({sender: ipcRenderer});
const msgSubscriber = createMessageSubscriber<MessageMap, unknown>({
  subscriber: ipcRenderer,
});

window.addEventListener("DOMContentLoaded", () => {
  let isMaximized = false;

  msgSubscriber.on("titlebar:isMaximized", (_, v) => {
    isMaximized = v;
  });

  new Titlebar({
    backgroundColor: Color.fromHex("#009688"),
    onMinimize() {
      msgSender.send("titlebar:minimize");
    },
    onMaximize() {
      msgSender.send("titlebar:maximize");
    },
    onClose() {
      msgSender.send("titlebar:close");
    },
    isMaximized() {
      return isMaximized;
    },
    onMenuItemClick() {
      return;
    },
  });
});

const api: API = {
  replicant(name) {
    return repFactory.createReplicant(name);
  },
  reload(id) {
    msgSender.send("reload", id);
  },
  help() {
    msgSender.send("help");
  },
  subscribeVersion(listener) {
    const l = (_: unknown, v: string) => listener(v);
    msgSubscriber.on("version", l);
    msgSender.send("version");
    return () => msgSubscriber.off("version", l);
  },
  subscribeOpenLayer(listener) {
    const l = (_: unknown, v: LayerConfig) => listener(v);
    msgSubscriber.on("openLayer", l);
    return () => msgSubscriber.off("openLayer", l);
  },
};

contextBridge.exposeInMainWorld("api", api);
