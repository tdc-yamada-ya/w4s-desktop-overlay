import WindowIcon from "@mui/icons-material/Window";
import {Button} from "@mui/material";
import {Fragment, useState} from "react";

import {LayoutDialog} from "./LayoutDialog";

export const OpenLayoutButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button startIcon={<WindowIcon />} onClick={() => setOpen(true)}>
        Open Layout
      </Button>
      <LayoutDialog open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};
