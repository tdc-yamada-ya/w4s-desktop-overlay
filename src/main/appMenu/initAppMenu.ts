import {Menu} from "electron";

import {openHelp} from "../help/openHelp";

const createMenu = () =>
  Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          role: "quit",
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About",
          click() {
            openHelp();
          },
        },
      ],
    },
  ]);

export const initAppMenu = () => {
  const menu = createMenu();
  Menu.setApplicationMenu(menu);
};
