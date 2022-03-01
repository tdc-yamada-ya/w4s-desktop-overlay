import {BrowserWindow} from "electron";

import {parseLayerSourceURL} from "./parseLayerSourceURL";

export const setWindowPageWithLayerSourceURL = (
  target: BrowserWindow,
  url?: string,
): void => {
  const source = parseLayerSourceURL(url);
  if (source.type === "url") {
    target.loadURL(source.value);
  } else if (source.type === "file") {
    target.loadFile(source.value);
  }
};
