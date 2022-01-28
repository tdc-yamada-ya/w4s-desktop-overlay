import {contextBridge, ipcRenderer} from "electron";

import {API} from "./api";
import {createMessageSender} from "./lib/electron-message/createMessageSender";
import {createMessageSubscriber} from "./lib/electron-message/createMessageSubscriber";
import {createChildReplicant} from "./lib/electron-replicant/createChildReplicant";
import {createCachedReplicantFactory} from "./lib/electron-replicant/createReplicantCache";
import {MessageMap} from "./message/MessageMap";
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

const api: API = {
  replicant: (name) => repFactory.createReplicant(name),

  reload: (id) => msgSender.send("reload", id),

  help: () => msgSender.send("help"),

  subscribeVersion: (listener) => {
    const l = (_: unknown, v: string) => listener(v);
    msgSubscriber.on("version", l);
    msgSender.send("version");
    return () => msgSubscriber.off("version", l);
  },
};

contextBridge.exposeInMainWorld("api", api);
