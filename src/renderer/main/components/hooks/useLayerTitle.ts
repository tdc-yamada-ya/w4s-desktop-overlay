import {useLayer} from "./useLayer";

export const useLayerTitle = (id?: string) => {
  const layer = useLayer(id);

  if (layer?.title) return layer.title;

  if (layer?.url) return layer.url;

  return "No Title";
};
