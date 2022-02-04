import {BrowserWindow, app} from "electron";

import {MessageMap} from "../lib/electron-message/MessageMap";
import {MessageSender} from "../lib/electron-message/MessageSender";
import {findAppProtocolArg} from "./findAppProtocolArg";
import {parseAppProtocolArg} from "./parseAppProtocolArg";

export const initAppProtocol = ({
  sender,
  window,
}: {
  sender: MessageSender<MessageMap>;
  window: BrowserWindow;
}) => {
  const processAppProtocolArg = (argv: string[]) => {
    const q = parseAppProtocolArg(findAppProtocolArg(argv));
    if (q) {
      window.show();

      if (q.type === "direct") {
        sender.send("openLayer", {
          settingsURL: q.settingsURL,
          title: q.title,
          url: q.url,
        });
      }
    }
  };

  app.on("second-instance", (_, argv) => processAppProtocolArg(argv));

  window.webContents.once("did-finish-load", () =>
    processAppProtocolArg(process.argv),
  );
};
