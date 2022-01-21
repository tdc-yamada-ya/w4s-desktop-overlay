import {IconButton, Tooltip} from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import {updateOverlay} from "./lib/updateOverlay";
import {moveToNextLayerDisplay} from "./lib/moveToNextLayerDisplay";
import {useScreen} from "./hooks/useScreen";

export const MoveNextLayerDisplayButton = ({id}: {id: string}) => {
  const s = useScreen();
  return (
    <Tooltip title='Move to next display'>
      <IconButton
        onClick={() => updateOverlay((o) => moveToNextLayerDisplay(o, id, s))}
      >
        <MonitorIcon />
      </IconButton>
    </Tooltip>
  );
};
