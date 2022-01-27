import {IconButton, Tooltip} from "@mui/material";
import {updateOverlay} from "./lib/updateOverlay";
import LayersIcon from "@mui/icons-material/Layers";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import {toggleLayerLayoutingMode} from "./lib/toggleLayerLayoutingMode";

export const ToggleLayerLayoutingModeButton = ({
  id,
  layoutingMode,
}: {
  id: string;
  layoutingMode: boolean | undefined;
}) => (
  <Tooltip title='Toggle Layouting Mode'>
    <IconButton
      onClick={() => updateOverlay((o) => toggleLayerLayoutingMode(o, id))}
    >
      {layoutingMode ? <LayersIcon /> : <LayersClearIcon />}
    </IconButton>
  </Tooltip>
);
