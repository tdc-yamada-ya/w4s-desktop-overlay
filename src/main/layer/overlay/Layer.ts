import {LayerProperties} from "../../../common/replicant/LayerProperties";

export type Layer = {
  apply(properties: Partial<LayerProperties>): void;
  dispose(): void;
  reload(): void;
};
