import {LayerURLTextField} from "./LayerURLTextField";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const SelectedLayerURLTextField = () => {
  const id = useSelectedLayerID();
  return <LayerURLTextField id={id} />;
};
