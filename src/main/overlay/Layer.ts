import {LayerConfig} from "../../replicant/LayerConfig";

export type Layer = {
  apply(c: LayerConfig): void;
  dispose(): void;
  reload(): void;
};
