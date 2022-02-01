import DeleteIcon from "@mui/icons-material/Delete";
import {Button, IconButton, Tooltip} from "@mui/material";
import {Fragment, useState} from "react";

import {DeleteLayerDialog} from "./DeleteLayerDialog";

export const DeleteLayerButton = ({
  id,
  variant = "icon",
}: {
  id?: string;
  variant?: "standard" | "icon";
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Tooltip title='Delete Layer'>
        {variant === "icon" ? (
          <IconButton color='error' onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <Button
            color='error'
            onClick={() => setOpen(true)}
            startIcon={<DeleteIcon />}
            variant='outlined'
          >
            Delete
          </Button>
        )}
      </Tooltip>
      <DeleteLayerDialog id={id} open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};
