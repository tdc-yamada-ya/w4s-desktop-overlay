import {Bounds} from "./Bounds";

export type LayerConfig = {
  audioMuted?: boolean;
  bounds?: Bounds;
  display?: number;
  index?: number;
  layoutingMode?: boolean;
  opacity?: number;
  url?: string;
  visible?: boolean;
};
