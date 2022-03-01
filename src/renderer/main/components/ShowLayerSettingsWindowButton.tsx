import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {Button, Tooltip} from "@mui/material";

const showLayerSettingsWindow = (id?: string) => {
  window.api.showLayerSettingsWindow(id);
};

export const ShowLayerSettingsWindowButton = ({id}: {id?: string}) => (
  <Tooltip title='Show layer settings window'>
    <Button
      startIcon={<OpenInNewIcon />}
      variant='text'
      size='small'
      onClick={() => showLayerSettingsWindow(id)}
    >
      Widget Settings
    </Button>
  </Tooltip>
);
