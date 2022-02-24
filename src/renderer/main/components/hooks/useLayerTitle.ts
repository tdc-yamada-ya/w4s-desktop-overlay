import {parseURL} from "../../../../common/logic/parseURL";
import {useLayer} from "./useLayer";

export const useLayerTitle = (id?: string) => {
  const layer = useLayer(id);

  if (layer?.title) return layer.title;

  if (layer?.url) {
    const {url, valid} = parseURL(layer?.url);
    if (valid) return url?.host;
  }

  return "No Title";
};
