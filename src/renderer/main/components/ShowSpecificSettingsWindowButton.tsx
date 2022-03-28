import SettingsIcon from "@mui/icons-material/Settings";
import {Button, Tooltip} from "@mui/material";
import {Fragment, useState} from "react";

import {CommonSettingsDialog} from "./CommonSettingsDialog";

export const ShowSpecificSettingsWindowButton = ({id}: {id?: string}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Tooltip title='Show common settings window'>
        <Button
          startIcon={<SettingsIcon />}
          variant='text'
          size='small'
          onClick={() => setOpen(true)}
        >
          Common
        </Button>
      </Tooltip>
      <CommonSettingsDialog
        id={id}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Fragment>
  );
};
