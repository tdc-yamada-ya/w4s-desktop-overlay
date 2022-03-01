import {sortLayers} from "../../../../common/logic/sortLayers";
import {LayerProperties} from "../../../../common/replicant/LayerProperties";
import {useOverlay} from "./useOverlay";

export const useLayers = ({
  sort,
}: {
  sort?: boolean;
}): [string, LayerProperties][] | undefined => {
  const o = useOverlay();
  let layers = o?.layers && Object.entries(o.layers);
  if (sort) layers = sortLayers(layers);
  return layers;
};
