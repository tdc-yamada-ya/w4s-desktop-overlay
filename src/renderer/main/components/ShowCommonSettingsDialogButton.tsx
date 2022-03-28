import SettingsIcon from "@mui/icons-material/Settings";
import {Button, Tooltip} from "@mui/material";

const showLayerSettingsWindow = (id?: string) => {
  window.api.showLayerSettingsWindow(id);
};

export const ShowCommonSettingsDialogButton = ({id}: {id?: string}) => (
  <Tooltip title='Show specific settings window'>
    <Button
      startIcon={<SettingsIcon />}
      variant='text'
      size='small'
      onClick={() => showLayerSettingsWindow(id)}
    >
      Specific
    </Button>
  </Tooltip>
);
