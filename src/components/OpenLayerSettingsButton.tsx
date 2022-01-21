import {IconButton, Tooltip} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import {Fragment, useState} from "react";
import {LayerSettingsDialog} from "./LayerSettingsDialog";

export const OpenLayerSettingsButton = ({id}: {id: string}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Tooltip title='Settings'>
        <IconButton onClick={() => setOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <LayerSettingsDialog id={id} onClose={() => setOpen(false)} open={open} />
    </Fragment>
  );
};
