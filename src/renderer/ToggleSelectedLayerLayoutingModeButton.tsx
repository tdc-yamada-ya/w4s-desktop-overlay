import {ToggleLayerLayoutingModeButton} from "./ToggleLayerLayoutingModeButton";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const ToggleSelectedLayerLayoutingModeButton = () => {
  const id = useSelectedLayerID();
  return <ToggleLayerLayoutingModeButton id={id} />;
};
