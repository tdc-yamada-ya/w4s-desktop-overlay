import {Box, Stack, Typography} from "@mui/material";

import {DeleteLayerButton} from "./DeleteLayerButton";
import {ReloadLayerButton} from "./ReloadLayerButton";
import {ShowCommonSettingsDialogButton} from "./ShowCommonSettingsDialogButton";
import {ShowSpecificSettingsWindowButton} from "./ShowSpecificSettingsWindowButton";
import {ToggleLayerAudioMutedButton} from "./ToggleLayerAudioMutedButton";
import {ToggleLayerLayoutingModeButton} from "./ToggleLayerLayoutingModeButton";
import {Designer} from "./designer/Designer";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";
import {useSelectedLayerTitle} from "./hooks/useSelectedLayerTitle";

const Toolbar = () => {
  const id = useSelectedLayerID();
  return (
    <Stack direction='row' spacing={0}>
      <ShowCommonSettingsDialogButton id={id} />
      <ShowSpecificSettingsWindowButton id={id} />
      <ReloadLayerButton id={id} />
      <ToggleLayerAudioMutedButton id={id} />
      <ToggleLayerLayoutingModeButton id={id} />
      <DeleteLayerButton id={id} />
    </Stack>
  );
};

const LayerTitle = () => {
  const title = useSelectedLayerTitle();
  return <Typography sx={{fontWeight: "bold"}}>{title}</Typography>;
};

const Head = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "0.1rem 0.3rem 0 1rem",
        width: "100%",
      }}
    >
      <Box sx={{alignItems: "center", display: "flex", flexGrow: 1}}>
        <LayerTitle />
      </Box>
      <Toolbar />
    </Box>
  );
};

export const MainPane = () => {
  return (
    <Box sx={{height: "100%", overflow: "hidden", width: "100%"}}>
      <Box
        sx={{
          height: "100%",
          overflow: "hidden",
          position: "absolute",
          width: "100%",
        }}
      >
        <Designer />
      </Box>
      <Box
        sx={{
          background: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 0.1rem 0.2rem rgba(0, 0, 0, 0.1)",
          left: "1rem",
          pointerEvents: "auto",
          position: "absolute",
          right: "1rem",
          top: "1rem",
        }}
      >
        <Head />
      </Box>
    </Box>
  );
};
