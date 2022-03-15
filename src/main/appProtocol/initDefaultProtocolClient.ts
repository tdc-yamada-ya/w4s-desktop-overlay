import {app} from "electron";
import path from "path";

import {isDev} from "../dev/dev";
import {appProtocol} from "./appProtocol";

export const initDefaultProtocolClient = () => {
  app.removeAsDefaultProtocolClient(appProtocol);

  if (isDev && process.platform === "win32") {
    const dir = path.resolve(process.argv[1] ?? "");
    const args = [dir];
    app.setAsDefaultProtocolClient(appProtocol, process.execPath, args);
  } else {
    app.setAsDefaultProtocolClient(appProtocol);
  }
};
