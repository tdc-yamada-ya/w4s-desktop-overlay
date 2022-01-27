import {shell} from "electron";

const helpURL = "https://tdc-yamada-ya.github.io/w4s-desktop-overlay/";

export const openHelp = () => shell.openExternal(helpURL);
