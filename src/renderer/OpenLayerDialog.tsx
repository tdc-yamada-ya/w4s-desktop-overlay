import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";
import {ReactNode} from "react";

import {useAddLayer} from "./hooks/useAddLayer";
import {useOpenLayerRequest} from "./hooks/useOpenLayerRequest";

const Section = ({label, children}: {label: string; children?: ReactNode}) => (
  <Stack spacing={0}>
    <Box>
      <Typography sx={{fontWeight: 800}}>{label}</Typography>
    </Box>
    <Box>
      <Typography sx={{opacity: 0.7, wordBreak: "break-all"}}>
        {children ?? "None"}
      </Typography>
    </Box>
  </Stack>
);

export const OpenLayerDialog = () => {
  const [layer, resolve] = useOpenLayerRequest();
  const add = useAddLayer();
  const open = !!layer;
  const onClose = () => resolve();

  return (
    <Dialog open={open} fullWidth={true} maxWidth='sm' onClose={onClose}>
      <DialogContent>
        <Stack spacing={4}>
          <DialogContentText>
            The app have been requested to add the following a layer. Are you
            sure you want to add?
          </DialogContentText>
          <Stack spacing={2}>
            <Section label='Title'>{layer?.title}</Section>
            <Section label='URL'>{layer?.url}</Section>
            <Section label='Settings URL'>{layer?.settingsURL}</Section>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant='outlined'
          onClick={() => {
            if (layer) add(layer);
            onClose();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
