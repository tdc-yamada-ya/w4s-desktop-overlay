import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {IconButton, Tooltip} from "@mui/material";

import {toggleLayerVisible} from "../logic/toggleLayerVisible";
import {useLayer} from "./hooks/useLayer";
import {updateOverlay} from "./replicant/updateOverlay";

const useCurrentValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.visible;
};

export const ToggleLayerVisibleButton = ({id}: {id?: string}) => {
  const value = useCurrentValue(id);

  return (
    <Tooltip title='Visibility'>
      <IconButton
        onClick={() => updateOverlay((o) => toggleLayerVisible(o, id))}
      >
        {value ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
    </Tooltip>
  );
};
