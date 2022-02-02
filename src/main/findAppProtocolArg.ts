import {appProtocol} from "./appProtocol";

export const findAppProtocolArg = (argv: string[]) =>
  argv.find((a) => a.startsWith(`${appProtocol}:`));
