import {LayerConfig} from "../replicant/LayerConfig";

export const sortLayers = (
  layers?: [string, LayerConfig][],
): [string, LayerConfig][] | undefined =>
  layers?.sort(([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0));
