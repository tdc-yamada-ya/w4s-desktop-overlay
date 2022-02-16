import {sortLayers} from "../../../../common/logic/sortLayers";
import {LayerConfig} from "../../../../common/replicant/LayerConfig";
import {useOverlay} from "./useOverlay";

export const useLayers = ({
  sort,
}: {
  sort?: boolean;
}): [string, LayerConfig][] | undefined => {
  const o = useOverlay();
  let layers = o?.layers && Object.entries(o.layers);
  if (sort) layers = sortLayers(layers);
  return layers;
};
