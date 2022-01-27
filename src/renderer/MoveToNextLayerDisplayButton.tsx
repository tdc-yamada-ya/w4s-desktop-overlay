import MonitorIcon from "@mui/icons-material/Monitor";
import {IconButton, Tooltip} from "@mui/material";

import {moveToNextLayerDisplay} from "../logic/moveToNextLayerDisplay";
import {useScreen} from "./hooks/useScreen";
import {updateOverlay} from "./replicant/updateOverlay";

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
