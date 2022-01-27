import {BrowserWindow} from "electron";
import path from "path";

const destroyAllWindows = () =>
  BrowserWindow.getAllWindows().forEach((w) => w.destroy());

export const createMainWindow = ({dev}: {dev: boolean}) => {
  const w = new BrowserWindow({
    alwaysOnTop: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  w.setMenu(null);
  w.on("closed", destroyAllWindows);

  if (dev) w.webContents.openDevTools({mode: "detach"});

  w.loadFile("dist/index.html");

  return w;
};
