import path from "path";

const initMainReload = () => {
  const dir = path.resolve(__dirname, "..");

  const execPath =
    process.platform === "win32"
      ? "../node_modules/electron/dist/electron.exe"
      : "../node_modules/.bin/electron";

  const elec = path.resolve(__dirname, "..", "..", execPath);

  const argv = process.argv.slice(2);

  console.log(
    `Initialize hot reload for main - dir: ${dir}, electron: ${elec}, argv: ${argv}`,
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("electron-reload")(dir, {
    chokidar: {},
    electron: elec,
    appArgv: argv,
    forceHardReset: true,
    hardResetMethod: "exit",
  });
};

const initRendererReload = () => {
  const dir = path.resolve(__dirname, "..", "..", "renderer");

  console.log(`Initialize hot reload for renderer - dir: ${dir}`);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("electron-reload")(dir);
};

export const initReload = () => {
  initMainReload();
  initRendererReload();
};
