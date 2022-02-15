import {Box, Button, Dialog, DialogActions} from "@mui/material";

import {Designer} from "./designer/Designer";

export const LayoutDialog = ({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          minHeight: "80vh",
          alignItems: "stretch",
        },
      }}
      open={open}
      fullWidth={true}
      maxWidth='xl'
      onClose={onClose}
    >
      <Box
        sx={{
          backgroundColor: "#f00",
          display: "grid",
          flexGrow: 1,
          gridTemplateColumns: "100%",
          gridTemplateRows: "100%",
          height: "100%",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Designer />
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
