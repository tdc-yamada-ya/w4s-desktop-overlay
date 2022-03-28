import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import {DeleteLayerInputSection} from "./DeleteLayerInputSection";
import {LayerBoundsInputSection} from "./LayerBoundsInputSection";
import {LayerCSSInputSection} from "./LayerCSSInputSection";
import {LayerLayoutingModeInputSection} from "./LayerLayoutingModeInputSection";
import {LayerOpacityInputSection} from "./LayerOpacityInputSection";
import {LayerSettingsURLInputSection} from "./LayerSettingsURLInputSection";
import {LayerTitleInputSection} from "./LayerTitleInputSection";
import {LayerURLInputSection} from "./LayerURLInputSection";
import {LayerVisibleInputSection} from "./LayerVisibleInputSection";

export const CommonSettingsDialog = ({
  id,
  open,
  onClose,
}: {
  id?: string;
  open: boolean;
  onClose: () => void;
}) => (
  <Dialog open={open} fullWidth={true} maxWidth='sm' onClose={onClose}>
    <DialogTitle>Common Settings</DialogTitle>
    <DialogContent>
      <Stack spacing={6}>
        <LayerTitleInputSection id={id} />
        <LayerURLInputSection id={id} />
        <LayerSettingsURLInputSection id={id} />
        <LayerBoundsInputSection id={id} />
        <LayerOpacityInputSection id={id} />
        <LayerLayoutingModeInputSection id={id} />
        <LayerVisibleInputSection id={id} />
        <LayerCSSInputSection id={id} />
        <DeleteLayerInputSection id={id} />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);
