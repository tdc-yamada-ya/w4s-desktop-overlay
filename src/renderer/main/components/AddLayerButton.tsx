import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";

import {addLayer} from "../../../common/logic/addLayer";
import {updateOverlay} from "../../common/replicant/updateOverlay";
import {useScreen} from "./hooks/useScreen";

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
