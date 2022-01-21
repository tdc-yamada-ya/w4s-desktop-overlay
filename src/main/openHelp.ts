import {shell} from "electron";

const url = "https://tdc-yamada-ya.github.io/w4s-desktop-overlay/";

export const openHelp = () => shell.openExternal(url);
