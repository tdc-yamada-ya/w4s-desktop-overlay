import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Tooltip} from "@mui/material";
import {Fragment, useState} from "react";

import {DeleteLayerDialog} from "./DeleteLayerDialog";

export const DeleteLayerButton = ({id}: {id?: string}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Tooltip title='Delete Layer'>
        <IconButton color='error' onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <DeleteLayerDialog id={id} open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};
