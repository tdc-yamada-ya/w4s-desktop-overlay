import {attachTitlebarToWindow} from "custom-electron-titlebar/main";
import {BrowserWindow} from "electron";
import path from "path";

import {isDev} from "./dev/dev";

const destroyAllWindows = () =>
  BrowserWindow.getAllWindows().forEach((w) => w.destroy());

export const createMainWindow = (): BrowserWindow => {
  const win = new BrowserWindow({
    height: 640,
    titleBarStyle: "hidden",
    width: 920,
    webPreferences: {
      preload: path.join(__dirname, "..", "renderer", "main", "preload.js"),
    },
  });

  win.on("closed", destroyAllWindows);
  win.loadFile("dist/renderer/main/index.html");
  attachTitlebarToWindow(win);

  if (isDev) win.webContents.openDevTools({mode: "detach"});

  return win;
};
