import {BrowserWindow} from "electron";
import path from "path";

import {dev} from "./dev";

const destroyAllWindows = () =>
  BrowserWindow.getAllWindows().forEach((w) => w.destroy());

export const createMainWindow = (): BrowserWindow => {
  const w = new BrowserWindow({
    height: 768,
    titleBarStyle: "hidden",
    width: 1024,
    webPreferences: {
      preload: path.join(__dirname, "..", "renderer", "main", "preload.js"),
    },
  });

  w.setMenu(null);
  w.on("closed", destroyAllWindows);

  if (dev) w.webContents.openDevTools({mode: "detach"});

  w.loadFile("dist/renderer/main/index.html");

  return w;
};
