import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {Fragment, useState} from "react";

import {AddLayerDialog} from "./AddLayerDialog";

export const AddLayerButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button
        startIcon={<AddIcon />}
        variant='outlined'
        size='small'
        onClick={() => setOpen(true)}
      >
        Add
      </Button>
      <AddLayerDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};
