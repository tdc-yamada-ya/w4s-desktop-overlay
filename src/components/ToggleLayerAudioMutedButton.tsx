import {IconButton, Tooltip} from "@mui/material";
import {updateOverlay} from "./lib/updateOverlay";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import {toggleLayerAudioMuted} from "./lib/toggleLayerAudioMuted";

export const ToggleLayerAudioMutedButton = ({
  id,
  audioMuted,
}: {
  id: string;
  audioMuted: boolean | undefined;
}) => (
  <Tooltip title='Mute'>
    <IconButton
      onClick={() => updateOverlay((o) => toggleLayerAudioMuted(o, id))}
    >
      {audioMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  </Tooltip>
);
