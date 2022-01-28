import {LayerTitleTextField} from "./LayerTitleTextField";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const SelectedLayerTitleTextField = () => {
  const id = useSelectedLayerID();
  return <LayerTitleTextField id={id} />;
};
