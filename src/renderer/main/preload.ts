import {Color, Titlebar} from "custom-electron-titlebar";
import {contextBridge, ipcRenderer} from "electron";

import {createMessageSender} from "../../common/lib/electron-message/createMessageSender";
import {createMessageSubscriber} from "../../common/lib/electron-message/createMessageSubscriber";
import {createChildReplicant} from "../../common/lib/electron-replicant/createChildReplicant";
import {createCachedReplicantFactory} from "../../common/lib/electron-replicant/createReplicantCache";
import {MessageMap} from "../../common/message/MessageMap";
import {LayerConfig} from "../../common/replicant/LayerConfig";
import {ReplicantMap} from "../../common/replicant/ReplicantMap";
import {API} from "./api";

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

  const titlebar = new Titlebar({
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

  msgSubscriber.on("version", (_, v) => {
    titlebar.updateTitle("W4S Desktop Overlay " + v);
  });

  msgSender.send("version");
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
  subscribeOpenLayer(listener) {
    const l = (_: unknown, v: LayerConfig) => listener(v);
    msgSubscriber.on("openLayer", l);
    return () => msgSubscriber.off("openLayer", l);
  },
};

contextBridge.exposeInMainWorld("api", api);