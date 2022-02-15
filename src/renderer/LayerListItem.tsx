import {Box, ButtonBase, Typography, useTheme} from "@mui/material";

import {LayerOpacitySlider} from "./LayerOpacitySlider";
import {ToggleLayerVisibleButton} from "./ToggleLayerVisibleButton";
import {useLayer} from "./hooks/useLayer";
import {useSelectLayer} from "./hooks/useSelectLayer";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";

export const LayerListItem = ({id}: {id: string}) => {
  const selectedID = useSelectedLayerID();
  const layer = useLayer(id);
  const selectLayer = useSelectLayer();
  const theme = useTheme();
  const selected = id === selectedID;
  const title = layer?.title || "No Title";
  const url = layer?.url || "No URL";

  return (
    <Box
      sx={{
        alignItems: "flex-start",
        backgroundColor: selected ? theme.palette.action.focus : "transparent",
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: "0",
        textAlign: "left",
        width: "100%",
      }}
    >
      <ButtonBase
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "1rem 1rem 0.5rem 1rem",
          textAlign: "left",
          width: "100%",
        }}
        onClick={() => selectLayer(id)}
      >
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
        <Typography
          sx={{
            color: theme.palette.text.disabled,
            fontSize: "0.8rem",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
          }}
        >
          {url}
        </Typography>
      </ButtonBase>
      <Box
        sx={{
          alignItems: "center",
          boxSizing: "border-box",
          display: "flex",
          gap: "0.5rem",
          padding: "0 1rem 0.25rem 1rem",
          width: "100%",
        }}
      >
        <Box sx={{flexGrow: 1}}>
          <LayerOpacitySlider id={id} size='small' />
        </Box>
        <ToggleLayerVisibleButton id={id} />
      </Box>
    </Box>
  );
};
