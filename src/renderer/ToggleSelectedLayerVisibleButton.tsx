import {ToggleLayerVisibleButton} from "./ToggleLayerVisibleButton";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const ToggleSelectedLayerVisibleButton = () => {
  const id = useSelectedLayerID();
  return <ToggleLayerVisibleButton id={id} />;
};
