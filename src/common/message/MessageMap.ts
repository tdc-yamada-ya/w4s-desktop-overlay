import {LayerConfig} from "../replicant/LayerConfig";

export type MessageMap = {
  help: {data: unknown};
  openLayer: {data: LayerConfig};
  reload: {data: string};
  version: {data: string};
  "titlebar:minimize": {data: unknown};
  "titlebar:maximize": {data: unknown};
  "titlebar:close": {data: unknown};
  "titlebar:isMaximized": {data: boolean};
};
