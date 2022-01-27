import LayersIcon from "@mui/icons-material/Layers";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import {IconButton, Tooltip} from "@mui/material";

import {toggleLayerLayoutingMode} from "../logic/toggleLayerLayoutingMode";
import {useLayer} from "./hooks/useLayer";
import {updateOverlay} from "./replicant/updateOverlay";

const useCurrentValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.layoutingMode;
};

export const ToggleLayerLayoutingModeButton = ({id}: {id?: string}) => {
  const value = useCurrentValue(id);

  return (
    <Tooltip title='Toggle Layouting Mode'>
      <IconButton
        onClick={() => updateOverlay((o) => toggleLayerLayoutingMode(o, id))}
      >
        {value ? <LayersIcon /> : <LayersClearIcon />}
      </IconButton>
    </Tooltip>
  );
};
