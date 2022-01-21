import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteLayer} from "./lib/deleteLayer";
import {updateOverlay} from "./lib/updateOverlay";

export const DeleteLayerButton = ({id}: {id: string}) => (
  <Tooltip title='Delete Layer'>
    <IconButton onClick={() => updateOverlay((o) => deleteLayer(o, id))}>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
);
