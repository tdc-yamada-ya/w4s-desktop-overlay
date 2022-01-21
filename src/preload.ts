import {contextBridge, ipcRenderer} from "electron";
import {API} from "./bridge";
import {createMessageSender} from "./lib/ts-electron-message/createMessageSender";
import {createMessageSubscriber} from "./lib/ts-electron-message/createMessageSubscriber";
import {createChildReplicant} from "./lib/ts-electron-replicant/createChildReplicant";
import {createCachedReplicantFactory} from "./lib/ts-electron-replicant/createReplicantCache";
import {MessageMap} from "./message/messages";
import {ReplicantMap} from "./replicant/replicants";

const replicantFactory = createCachedReplicantFactory<ReplicantMap>({
  createReplicant: (name) => {
    return createChildReplicant(name, {
      sender: ipcRenderer,
      subscriber: ipcRenderer,
    });
  },
});
const messageSender = createMessageSender<MessageMap>({sender: ipcRenderer});
const messageSubscriber = createMessageSubscriber<MessageMap, unknown>({
  subscriber: ipcRenderer,
});

const api: API = {
  replicant: (name) => replicantFactory.createReplicant(name),
  reload: (id) => messageSender.send("reload", id),
  help: () => messageSender.send("help"),
  subscribeVersion: (listener) => {
    const l = (_: unknown, v: string) => listener(v);
    messageSubscriber.on("version", l);
    messageSender.send("version");
    return () => messageSubscriber.off("version", l);
  },
};

contextBridge.exposeInMainWorld("api", api);
