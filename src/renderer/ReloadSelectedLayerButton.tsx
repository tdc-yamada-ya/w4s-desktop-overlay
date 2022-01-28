import {ReloadLayerButton} from "./ReloadLayerButton";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const ReloadSelectedLayerButton = () => {
  const id = useSelectedLayerID();
  return <ReloadLayerButton id={id} />;
};
