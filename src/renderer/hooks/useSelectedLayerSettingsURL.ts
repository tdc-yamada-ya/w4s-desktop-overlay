import {useSelectedLayer} from "./useSelectedLayer";

export const useSelectedLayerSettingsURL = () => {
  const l = useSelectedLayer();
  return l?.settingsURL;
};
