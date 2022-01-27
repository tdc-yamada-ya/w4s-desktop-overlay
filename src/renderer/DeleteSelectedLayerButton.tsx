import {DeleteLayerButton} from "./DeleteLayerButton";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const DeleteSelectedLayerButton = () => {
  const id = useSelectedLayerID();
  return <DeleteLayerButton id={id} />;
};
