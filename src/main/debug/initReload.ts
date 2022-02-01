import path from "path";

export const initReload = () => {
  const dir = path.resolve(__dirname, "../..");

  const execPath =
    process.platform === "win32"
      ? "../node_modules/electron/dist/electron.exe"
      : "../node_modules/.bin/electron";

  const elec = path.resolve(dir, execPath);

  const argv = process.argv.slice(2);

  console.log(
    `Initialize hot reload - dir: ${dir}, electron: ${elec}, argv: ${argv}`,
  );

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("electron-reload")(dir, {
    electron: elec,
    appArgv: argv,
    forceHardReset: true,
    hardResetMethod: "exit",
  });
};
