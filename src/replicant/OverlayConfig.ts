import {LayerConfig} from "./LayerConfig";

type LayerMap = {
  [key: string]: LayerConfig;
};

export type OverlayConfig = {
  layers?: LayerMap;
  selectedLayerID?: string;
};
