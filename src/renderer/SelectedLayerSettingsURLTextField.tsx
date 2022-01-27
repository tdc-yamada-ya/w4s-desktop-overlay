import {LayerSettingsURLTextField} from "./LayerSettingsURLTextField";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const SelectedLayerSettingsURLTextField = () => {
  const id = useSelectedLayerID();
  return <LayerSettingsURLTextField id={id} />;
};
