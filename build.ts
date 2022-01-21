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
  },
})
  .then(() => console.log("Completed."))
  .catch((err) => console.log(err));
