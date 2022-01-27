import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import {deleteLayer} from "../logic/deleteLayer";
import {updateOverlay} from "./replicant/updateOverlay";

export const DeleteLayerDialog = ({
  id,
  open,
  onClose,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const submit = () => {
    updateOverlay((o) => deleteLayer(o, id));
    onClose();
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth='sm' onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the layer?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' color='error' onClick={submit}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
