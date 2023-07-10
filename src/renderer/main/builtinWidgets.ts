import clockIcon from "../../../assets/icons/clock.svg";
import layerIcon from "../../../assets/icon.svg";
import {BuiltinWidget} from "./BuiltinWidget";

const clock: BuiltinWidget = {
  label: "Clock",
  icon: clockIcon,
  layer: {
    settingsURL: "builtin://clock/settings",
    title: "Clock",
    url: "builtin://clock/view",
  },
};
const otherWindow: BuiltinWidget = {
  label: "Other Window",
  icon: layerIcon,
  layer: {
    settingsURL: "builtin://video/settings",
    title: "OtherWindow",
    url: "builtin://video/view",
    allowUserMedia: true,
  },
};

export const builtinWidgets: {[id: string]: BuiltinWidget} = {
  clock,
  otherWindow,
};
