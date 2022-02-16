import {LayerConfig} from "../../common/replicant/LayerConfig";

export type Layer = {
  apply(c: Partial<LayerConfig>): void;
  dispose(): void;
  reload(): void;
};
