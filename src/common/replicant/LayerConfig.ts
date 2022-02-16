import {Bounds} from "./Bounds";

export type LayerConfig = {
  audioMuted?: boolean;
  bounds?: Bounds;
  css?: string;
  display?: number;
  index?: number;
  layoutingMode?: boolean;
  opacity?: number;
  title?: string;
  url?: string;
  settingsURL?: string;
  visible?: boolean;
};
