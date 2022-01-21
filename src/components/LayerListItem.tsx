import {Box, ButtonGroup, Tooltip, Typography} from "@mui/material";
import {LayerConfig} from "../replicant/replicants";
import {LayerURLInputField} from "./LayerURLInputField";
import {DeleteLayerButton} from "./DeleteLayerButton";
import {ToggleLayerVisibleButton} from "./ToggleLayerVisibleButton";
import {MoveNextLayerDisplayButton} from "./MoveToNextLayerDisplayButton";
import {OpenLayerSettingsButton} from "./OpenLayerSettingsButton";
import {ToggleLayerAudioMutedButton} from "./ToggleLayerAudioMutedButton";
import {ReloadLayerButton} from "./ReloadLayerButton";
import OpacityIcon from "@mui/icons-material/Opacity";
import {LayerOpacitySlider} from "./LayerOpacitySlider";

export const LayerListItem = ({
  id,
  index,
  layer,
}: {
  id: string;
  index: number;
  layer: LayerConfig;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Box
        sx={{
          alignItem: "center",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            gap: "0",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "#eee",
              borderRadius: "3rem 0 0 3rem",
              boxSizing: "border-box",
              color: "#999",
              display: "flex",
              justifyContent: "flex-end",
              lineHeight: "100%",
              padding: "0 0.5rem 0 0",
              width: "3rem",
            }}
          >
            <Typography>{index + 1}</Typography>
          </Box>
          <Box
            sx={{
              alignItem: "center",
              backgroundColor: "#eee",
              borderRadius: "0 3rem 3rem 0",
              display: "flex",
              flexGrow: 1,
              padding: "0 0.5rem 0 0.5rem",
            }}
          >
            <LayerURLInputField id={id} url={layer.url} />
          </Box>
        </Box>
        <ButtonGroup>
          <ReloadLayerButton id={id} />
          <OpenLayerSettingsButton id={id} />
          <MoveNextLayerDisplayButton id={id} />
          <ToggleLayerAudioMutedButton id={id} audioMuted={layer.audioMuted} />
          <ToggleLayerVisibleButton id={id} visible={layer.visible} />
          <DeleteLayerButton id={id} />
        </ButtonGroup>
      </Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Tooltip title='Opacity'>
          <OpacityIcon />
        </Tooltip>
        <LayerOpacitySlider id={id} />
      </Box>
    </Box>
  );
};
