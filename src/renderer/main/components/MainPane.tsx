import {Box, Container, Divider, Stack, Typography} from "@mui/material";

import {AnimatedIcon} from "./AnimatedIcon";
import {DeleteLayerButton} from "./DeleteLayerButton";
import {DeleteLayerInputSection} from "./DeleteLayerInputSection";
import {KeepRatioSplitPane} from "./KeepRatioSplitPane";
import {LayerBoundsInputSection} from "./LayerBoundsInputSection";
import {LayerCSSInputSection} from "./LayerCSSInputSection";
import {LayerLayoutingModeInputSection} from "./LayerLayoutingModeInputSection";
import {LayerOpacityInputSection} from "./LayerOpacityInputSection";
import {LayerSettingsURLInputSection} from "./LayerSettingsURLInputSection";
import {LayerTitleInputSection} from "./LayerTitleInputSection";
import {LayerURLInputSection} from "./LayerURLInputSection";
import {LayerVisibleInputSection} from "./LayerVisibleInputSection";
import {ReloadLayerButton} from "./ReloadLayerButton";
import {ShowLayerSettingsWindowButton} from "./ShowLayerSettingsWindowButton";
import {ToggleLayerAudioMutedButton} from "./ToggleLayerAudioMutedButton";
import {ToggleLayerLayoutingModeButton} from "./ToggleLayerLayoutingModeButton";
import {Designer} from "./designer/Designer";
import {useIsLayerSelected} from "./hooks/useIsLayerSelected";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";
import {useSelectedLayerTitle} from "./hooks/useSelectedLayerTitle";

const GeneralPage = () => {
  const id = useSelectedLayerID();
  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Container sx={{margin: "0 auto", padding: "1rem"}} maxWidth='xs'>
        <Stack spacing={2}>
          <Box>
            <Typography
              sx={{
                fontSize: "0.7rem",
                opacity: 0.5,
                textTransform: "uppercase",
              }}
            >
              Common Settings
            </Typography>
          </Box>
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
        </Stack>
      </Container>
    </Box>
  );
};

const Toolbar = () => {
  const id = useSelectedLayerID();
  return (
    <Stack direction='row' spacing={0}>
      <ShowLayerSettingsWindowButton id={id} />
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
        boxShadow: "0 0.1rem 0.2rem rgba(0, 0, 0, 0.1)",
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

const LayerSettings = () => (
  <Box
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      width: "100%",
    }}
  >
    <Head />
    <Divider />
    <Box sx={{flexGrow: 1, overflow: "hidden"}}>
      <GeneralPage />
    </Box>
  </Box>
);

const Usage = () => (
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      height: "100%",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <AnimatedIcon height='8rem' width='8rem' />
    <Typography sx={{opacity: 0.6}}>
      Select a layer. If no layer, add one.
    </Typography>
  </Box>
);

export const MainPane = () => {
  const isLayerSelected = useIsLayerSelected();

  return (
    <KeepRatioSplitPane
      defaultRatio={0.6}
      maxSize={-100}
      minSize={100}
      split='horizontal'
    >
      <Designer />
      {isLayerSelected ? <LayerSettings /> : <Usage />}
    </KeepRatioSplitPane>
  );
};
