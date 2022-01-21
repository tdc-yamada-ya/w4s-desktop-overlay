import {Button} from "@mui/material";
import {useScreen} from "./hooks/useScreen";
import {addLayer} from "./lib/addLayer";
import {updateOverlay} from "./lib/updateOverlay";
import AddIcon from "@mui/icons-material/Add";

export const AddLayerButton = () => {
  const screen = useScreen();

  return (
    <Button
      startIcon={<AddIcon />}
      onClick={() => updateOverlay((o) => addLayer(o, screen))}
    >
      Add Layer
    </Button>
  );
};
