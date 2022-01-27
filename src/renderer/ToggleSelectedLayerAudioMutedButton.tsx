import {ToggleLayerAudioMutedButton} from "./ToggleLayerAudioMutedButton";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const ToggleSelectedLayerAudioMutedButton = () => {
  const id = useSelectedLayerID();
  return <ToggleLayerAudioMutedButton id={id} />;
};
