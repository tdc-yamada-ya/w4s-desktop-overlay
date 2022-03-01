import {BrowserWindow} from "electron";

import {SetVisibleFunction} from "./SetVisibleFunction";

export const createSetVisibleFunction = (
  w: BrowserWindow,
): SetVisibleFunction => {
  let visible = false;
  let ready = false;

  const refresh = () => {
    if (ready && visible) w.show();
    else w.hide();
  };

  w.webContents.on("did-start-navigation", (_e, _u, isInPlace, isMainFrame) => {
    if (isInPlace || !isMainFrame) return;
    ready = false;
    refresh();
  });

  w.webContents.on("did-finish-load", () => {
    ready = true;
    refresh();
  });

  return (v: boolean) => {
    visible = v;
    refresh();
  };
};
