import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";

import {addLayer} from "../logic/addLayer";
import {useScreen} from "./hooks/useScreen";
import {updateOverlay} from "./replicant/updateOverlay";

export const AddLayerButton = ({variant}: {variant?: "outlined"}) => {
  const screen = useScreen();

  return (
    <Button
      startIcon={<AddIcon />}
      variant={variant}
      onClick={() => updateOverlay((o) => addLayer(o, screen))}
    >
      Add Layer
    </Button>
  );
};
