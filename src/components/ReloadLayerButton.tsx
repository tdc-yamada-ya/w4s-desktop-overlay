import {IconButton, Tooltip} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

export const ReloadLayerButton = ({id}: {id: string}) => (
  <Tooltip title='Reload'>
    <IconButton onClick={() => window.api.reload(id)}>
      <ReplayIcon />
    </IconButton>
  </Tooltip>
);
