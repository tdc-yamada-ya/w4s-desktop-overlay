import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {IconButton, Tooltip} from "@mui/material";

import {toggleLayerAudioMuted} from "../logic/toggleLayerAudioMuted";
import {useLayer} from "./hooks/useLayer";
import {updateOverlay} from "./replicant/updateOverlay";

const useCurrentValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.audioMuted;
};

export const ToggleLayerAudioMutedButton = ({id}: {id?: string}) => {
  const value = useCurrentValue(id);

  return (
    <Tooltip title='Mute'>
      <IconButton
        onClick={() => updateOverlay((o) => toggleLayerAudioMuted(o, id))}
      >
        {value ? <VolumeOffIcon /> : <VolumeUpIcon />}
      </IconButton>
    </Tooltip>
  );
};
