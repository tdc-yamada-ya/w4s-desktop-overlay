import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import {useDeleteLayer} from "./hooks/useDeleteLayer";

export const DeleteLayerDialog = ({
  id,
  open,
  onClose,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
}) => {
  const del = useDeleteLayer(id);

  return (
    <Dialog open={open} fullWidth={true} maxWidth='sm' onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the layer?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => {
            del();
            onClose();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
