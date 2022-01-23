// eslint-disable-next-line @typescript-eslint/no-var-requires
const convertToWindowsStore = require("electron-windows-store");

convertToWindowsStore({
  assets: ".\\appx\\assets\\",
  identityName: "123456tdc.W4SDesktopOverlay",
  inputDirectory: ".\\release\\win-unpacked",
  makeappxParams: ["/l"],
  makePri: true,
  manifest: ".\\appx\\AppXManifest.xml",
  outputDirectory: ".\\release\\appx",
  packageVersion: "0.0.1.0",
  packageName: "W4SDesktopOverlay",
  packageDisplayName: "W4S Desktop Overlay",
  packageDescription:
    "This is a desktop application for streamers that overlays web pages on your desktop.",
  packageBackgroundColor: "#ffffff",
  packageExecutable: "app/W4S Desktop Overlay.exe",
  publisherDisplayName: "tdc",
});
