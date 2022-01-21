import {IconButton, Tooltip} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {updateOverlay} from "./lib/updateOverlay";
import {toggleLayerVisible} from "./lib/toggleLayerVisible";

export const ToggleLayerVisibleButton = ({
  id,
  visible,
}: {
  id: string;
  visible: boolean | undefined;
}) => (
  <Tooltip title='Visibility'>
    <IconButton onClick={() => updateOverlay((o) => toggleLayerVisible(o, id))}>
      {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </IconButton>
  </Tooltip>
);
