import clockIcon from "../../../assets/icons/clock.svg";
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

export const builtinWidgets: {[id: string]: BuiltinWidget} = {
  clock,
};
