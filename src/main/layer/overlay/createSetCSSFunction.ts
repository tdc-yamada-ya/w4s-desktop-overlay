import {BrowserWindow} from "electron";

import {SetCSSFunction} from "./SetCSSFunction";

export const createSetCSSFunction = (w: BrowserWindow): SetCSSFunction => {
  let key = "";
  let css = "";

  const refresh = () => {
    w.webContents.removeInsertedCSS(key);
    w.webContents.insertCSS(css).then((v) => (key = v));
  };

  w.webContents.on("dom-ready", () => {
    refresh();
  });

  return (v: string) => {
    css = v;
    refresh();
  };
};
