import {session} from "electron";
import {searchDevtools} from "electron-search-devtools";

export const initReactDevtool = async () => {
  const devtool = await searchDevtools("REACT", {browser: "google-chrome"});
  if (devtool) {
    await session.defaultSession.loadExtension(devtool, {
      allowFileAccess: true,
    });
  }
};
