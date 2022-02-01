import {LayerConfig} from "../replicant/LayerConfig";

export type MessageMap = {
  help: {data: unknown};
  openLayer: {data: LayerConfig};
  reload: {data: string};
  version: {data: string};
};
