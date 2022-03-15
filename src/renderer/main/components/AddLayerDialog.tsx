import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {useState} from "react";

import {useTheme} from "../../common/components/hooks/useTheme";
import {builtinWidgets} from "../builtinWidgets";
import {useAddLayer} from "./hooks/useAddLayer";

const AddLayerWithCustomURLPane = ({onAdd}: {onAdd: () => void}) => {
  const [url, setURL] = useState("");
  const addLayer = useAddLayer();

  return (
    <Stack spacing={1}>
      <Typography sx={{opacity: 0.5}}>Custom URL</Typography>
      <TextField
        sx={{flexGrow: 1}}
        label='URL'
        variant='standard'
        value={url}
        onChange={(e) => setURL(e.target.value)}
      />
      <Box sx={{display: "flex"}}>
        <Button
          variant='contained'
          onClick={() => {
            addLayer({url: url || undefined});
            onAdd();
          }}
        >
          Add
        </Button>
      </Box>
    </Stack>
  );
};

const AddLayerWithBuiltinWidgetsPane = ({onAdd}: {onAdd: () => void}) => {
  const theme = useTheme();
  const addLayer = useAddLayer();

  return (
    <Stack spacing={1}>
      <Box>
        <Typography sx={{opacity: 0.5}}>Built-in Widgets</Typography>
      </Box>
      <Box sx={{display: "flex", flexWrap: "wrap", gap: "0.5rem"}}>
        {Object.entries(builtinWidgets).map(([id, w]) => (
          <ButtonBase
            key={id}
            onClick={() => {
              addLayer(w.layer);
              onAdd();
            }}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "0.5rem",
              flexDirection: "column",
              gap: "0.2rem",
              height: "6rem",
              padding: "0.5rem",
              width: "6rem",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${w.icon})`,
                backgroundPosition: "center",
                backgroundSize: "contained",
                height: "2rem",
                opacity: 0.8,
                width: "2rem",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  opacity: 0.8,
                  textTransform: "uppercase",
                }}
              >
                {w.label}
              </Typography>
            </Box>
          </ButtonBase>
        ))}
      </Box>
    </Stack>
  );
};

export const AddLayerDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} fullWidth={true} maxWidth='xs' onClose={onClose}>
    <DialogTitle>Add Layer</DialogTitle>
    <DialogContent>
      <Stack spacing={4}>
        <AddLayerWithCustomURLPane
          onAdd={() => {
            onClose();
          }}
        />
        <AddLayerWithBuiltinWidgetsPane
          onAdd={() => {
            onClose();
          }}
        />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);
