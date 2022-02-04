import {build} from "electron-builder";

build({
  config: {
    appId: "jp.co.tdc.w4sdesktopoverlay",
    productName: "W4S Desktop Overlay",
    copyright: "© 2022 TDC SOFT Inc.",
    artifactName: "${name}-${version}-${platform}-${arch}.${ext}",
    files: ["dist/**/*"],
    directories: {
      output: "release",
      buildResources: "assets",
    },
    win: {
      icon: "assets/icon.ico",
    },
    mac: {
      identity: null,
      icon: "assets/icon.icns",
    },
    linux: {
      category: "Utility",
    },
    nsis: {
      include: "build/installer.nsh",
      perMachine: true,
    },
    // HACK: Configured electron-builder not to build native dependencies, since building node-canvas would cause errors.
    npmRebuild: false,
  },
})
  .then(() => console.log("Completed."))
  .catch((err) => console.log(err));
