import {LayerProperties} from "../replicant/LayerProperties";

export const sortLayers = (
  layers?: [string, LayerProperties][],
): [string, LayerProperties][] | undefined =>
  layers?.sort(([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0));
