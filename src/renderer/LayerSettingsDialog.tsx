import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import {merge} from "lodash";
import {useEffect, useState} from "react";

import {OverlayConfig} from "../replicant/OverlayConfig";
import {updateOverlay} from "./replicant/updateOverlay";

export const LayerSettingsDialog = ({
  id,
  onClose,
  open,
}: {
  id: string;
  onClose: () => void;
  open: boolean;
}) => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    if (!open) return;

    const overlay = window.api.replicant("overlay").get();
    const layer = overlay?.layers?.[id];

    setX((layer?.bounds?.x ?? 0).toString());
    setY((layer?.bounds?.y ?? 0).toString());
    setWidth((layer?.bounds?.width ?? 0).toString());
    setHeight((layer?.bounds?.height ?? 0).toString());
  }, [id, open]);

  const submit = () => {
    const diff: OverlayConfig = {
      layers: {
        [id]: {
          bounds: {
            x: parseInt(x) || 0,
            y: parseInt(y) || 0,
            width: parseInt(width) || 0,
            height: parseInt(height) || 0,
          },
        },
      },
    };

    updateOverlay((o) => merge(o, diff));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Layer Settings</DialogTitle>
      <DialogContent>
        <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
          <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
            <Typography sx={{textTransform: "uppercase"}} variant='subtitle1'>
              Bounds
            </Typography>
            <Box sx={{display: "flex", gap: "2rem"}}>
              <Box sx={{display: "flex", gap: "1rem"}}>
                <TextField
                  label='x'
                  variant='standard'
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                />
                <TextField
                  label='y'
                  variant='standard'
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                />
              </Box>
              <Box sx={{display: "flex", gap: "1rem"}}>
                <TextField
                  label='width'
                  variant='standard'
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
                <TextField
                  label='height'
                  variant='standard'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained' onClick={submit}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
