import ReplayIcon from "@mui/icons-material/Replay";
import {IconButton, Tooltip} from "@mui/material";

const reload = (id?: string) => {
  if (id == null) return;
  window.api.reload(id);
};

export const ReloadLayerButton = ({id}: {id?: string}) => (
  <Tooltip title='Reload'>
    <IconButton onClick={() => reload(id)}>
      <ReplayIcon />
    </IconButton>
  </Tooltip>
);
