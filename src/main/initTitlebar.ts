import {BrowserWindow} from "electron";

import {MessageMap} from "../lib/electron-message/MessageMap";
import {MessageSender} from "../lib/electron-message/MessageSender";
import {MessageSubscriber} from "../lib/electron-message/MessageSubscriber";

export const initTitlebar = ({
  sender,
  subscriber,
  window,
}: {
  sender: MessageSender<MessageMap>;
  subscriber: MessageSubscriber<MessageMap, unknown>;
  window: BrowserWindow;
}) => {
  subscriber.on("titlebar:minimize", () => window.minimize());

  subscriber.on("titlebar:maximize", () => {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  });

  subscriber.on("titlebar:close", () => window.close());

  window.webContents.once("did-finish-load", () => {
    sender.send("titlebar:isMaximized", window.isMaximized());
  });

  window.on("maximize", () => sender.send("titlebar:isMaximized", true));

  window.on("unmaximize", () => sender.send("titlebar:isMaximized", false));
};
