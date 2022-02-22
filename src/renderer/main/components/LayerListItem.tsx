import {Box, ButtonBase, Typography, useTheme} from "@mui/material";

import {parseURL} from "../../../common/logic/parseURL";
import {LayerOpacitySlider} from "./LayerOpacitySlider";
import {ToggleLayerAudioMutedButton} from "./ToggleLayerAudioMutedButton";
import {ToggleLayerVisibleButton} from "./ToggleLayerVisibleButton";
import {useLayer} from "./hooks/useLayer";
import {useSelectLayer} from "./hooks/useSelectLayer";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

const useLayerTitle = (id: string) => {
  const layer = useLayer(id);
  if (layer?.title) return layer.title;
  if (layer?.url) {
    const {url, valid} = parseURL(layer?.url);
    if (valid) return url?.host;
  }
  return "No Title";
};

export const LayerListItem = ({id}: {id: string}) => {
  const selectedID = useSelectedLayerID();
  const title = useLayerTitle(id);
  const selectLayer = useSelectLayer();
  const theme = useTheme();
  const selected = id === selectedID;

  return (
    <Box
      sx={{
        backgroundColor: selected ? theme.palette.action.focus : "transparent",
        position: "relative",
      }}
    >
      <ButtonBase
        sx={{
          height: "100%",
          position: "absolute",
          width: "100%",
        }}
        onClick={() => selectLayer(id)}
      />
      <Box
        sx={{
          alignItems: "flex-start",
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "0",
          padding: "0.5rem 0.5rem 0.25rem 1rem",
          textAlign: "left",
          width: "100%",
        }}
      >
        <Box>
          <Typography
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            boxSizing: "border-box",
            display: "flex",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              boxSizing: "border-box",
              display: "flex",
            }}
          >
            <LayerOpacitySlider id={id} size='small' />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              boxSizing: "border-box",
              display: "flex",
            }}
          >
            <ToggleLayerVisibleButton id={id} />
            <ToggleLayerAudioMutedButton id={id} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
