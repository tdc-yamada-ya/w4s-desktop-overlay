import {Box, ButtonBase, Typography, useTheme} from "@mui/material";

import {setSelectedLayerID} from "../logic/setSelectedLayerID";
import {LayerConfig} from "../replicant/LayerConfig";
import {LayerOpacitySlider} from "./LayerOpacitySlider";
import {ToggleLayerVisibleButton} from "./ToggleLayerVisibleButton";
import {useOverlay} from "./hooks/useOverlay";
import {updateOverlay} from "./replicant/updateOverlay";

const useSelectedLayerID = () => {
  const overlay = useOverlay();
  return overlay?.selectedLayerID;
};

const useSelected = (id: string) => {
  const selectedLayerID = useSelectedLayerID();
  return id === selectedLayerID;
};

export const SideLayerListItem = ({
  id,
  layer,
}: {
  id: string;
  layer: LayerConfig;
}) => {
  const selected = useSelected(id);
  const theme = useTheme();
  const title = layer.title || "No Title";
  const url = layer.url || "No URL";

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
        onClick={() => updateOverlay((o) => setSelectedLayerID(o, id))}
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
            fontSize: "0.85rem",
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
          gap: "0.75rem",
          padding: "0 1rem 0.5rem 1rem",
          width: "100%",
        }}
      >
        <Box sx={{flexGrow: 1}}>
          <LayerOpacitySlider id={id} />
        </Box>
        <ToggleLayerVisibleButton id={id} />
      </Box>
    </Box>
  );
};
