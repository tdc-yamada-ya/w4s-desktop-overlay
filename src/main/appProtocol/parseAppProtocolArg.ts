import {parse} from "qs";

import {appProtocol} from "./appProtocol";

export type AppProtocolQuery =
  | {type: undefined}
  | {
      type: "direct";
      title?: string;
      url?: string;
      settingsURL?: string;
    };

export const parseAppProtocolArg = (arg?: string) => {
  if (!arg) return;
  return parse(
    arg?.substring(appProtocol.length + 1) ?? "",
  ) as AppProtocolQuery;
};
