import {
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {ReactNode, useState} from "react";

import {DeleteLayerButton} from "./DeleteLayerButton";
import {DeleteLayerInputSection} from "./DeleteLayerInputSection";
import {ExternalSettings} from "./ExternalSettings";
import {FirstSteps} from "./FirstSteps";
import {LayerBoundsInputSection} from "./LayerBoundsInputSection";
import {LayerLayoutingModeInputSection} from "./LayerLayoutingModeInputSection";
import {LayerOpacityInputSection} from "./LayerOpacityInputSection";
import {LayerSettingsURLInputSection} from "./LayerSettingsURLInputSection";
import {LayerTitleInputSection} from "./LayerTitleInputSection";
import {LayerURLInputSection} from "./LayerURLInputSection";
import {LayerVisibleInputSection} from "./LayerVisibleInputSection";
import {ReloadLayerButton} from "./ReloadLayerButton";
import {ToggleLayerAudioMutedButton} from "./ToggleLayerAudioMutedButton";
import {ToggleLayerLayoutingModeButton} from "./ToggleLayerLayoutingModeButton";
import {useIsLayerSelected} from "./hooks/useIsLayerSelected";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";
import {useSelectedLayerTitle} from "./hooks/useSelectedLayerTitle";

const GuidePage = () => {
  const id = useSelectedLayerID();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        height: "100%",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box sx={{flexGrow: 1, overflow: "auto"}}>
        <FirstSteps id={id} />
      </Box>
    </Box>
  );
};

const GeneralPage = () => {
  const id = useSelectedLayerID();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{flexGrow: 1, overflow: "auto"}}>
        <Container sx={{margin: "0 auto", padding: "1rem"}} maxWidth='md'>
          <Stack spacing={4}>
            <LayerLayoutingModeInputSection id={id} />
            <LayerTitleInputSection id={id} />
            <LayerURLInputSection id={id} />
            <LayerSettingsURLInputSection id={id} />
            <LayerBoundsInputSection id={id} />
            <LayerOpacityInputSection id={id} />
            <LayerVisibleInputSection id={id} />
            <DeleteLayerInputSection id={id} />
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

const LayerSettingsTabPanel = ({
  children,
  tab,
  value,
}: {
  children?: ReactNode;
  tab?: string;
  value?: string;
}) => {
  const selected = value === tab;

  return (
    <Box sx={{height: "100%", width: "100%"}} hidden={!selected}>
      {selected && children}
    </Box>
  );
};

const LayerSettingsTabs = () => {
  const [tab, setTab] = useState("guide");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Tabs sx={{margin: "0 1rem"}} value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label='Guide' value='guide' />
        <Tab label='General' value='general' />
        <Tab label='External' value='external' />
      </Tabs>
      <Divider />
      <Box sx={{flexGrow: 1, overflow: "hidden"}}>
        <LayerSettingsTabPanel tab='guide' value={tab}>
          <GuidePage />
        </LayerSettingsTabPanel>
        <LayerSettingsTabPanel tab='general' value={tab}>
          <GeneralPage />
        </LayerSettingsTabPanel>
        <LayerSettingsTabPanel tab='external' value={tab}>
          <ExternalSettings />
        </LayerSettingsTabPanel>
      </Box>
    </Box>
  );
};

const Toolbar = () => {
  const id = useSelectedLayerID();
  return (
    <Stack direction='row' spacing={0}>
      <ReloadLayerButton id={id} />
      <ToggleLayerAudioMutedButton id={id} />
      <ToggleLayerLayoutingModeButton id={id} />
      <DeleteLayerButton id={id} />
    </Stack>
  );
};

const LayerTitle = () => {
  const title = useSelectedLayerTitle() || "No Title";
  return (
    <Typography sx={{fontSize: "1.2rem", fontWeight: "bold"}}>
      {title}
    </Typography>
  );
};

const Head = () => {
  return (
    <Box sx={{display: "flex", margin: "0.5rem 0.5rem 0 1rem"}}>
      <Box sx={{flexGrow: 1}}>
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
    <Box sx={{flexGrow: 1, overflow: "hidden"}}>
      <LayerSettingsTabs />
    </Box>
  </Box>
);

const Usage = () => (
  <Box sx={{height: "100%", width: "100%"}}>
    <Container sx={{margin: "2rem auto"}} maxWidth='sm'>
      <Typography sx={{opacity: 0.6}}>
        Select a layer to open the setting window. If no layer, add one.
      </Typography>
    </Container>
  </Box>
);

export const MainPane = () => {
  const isLayerSelected = useIsLayerSelected();
  return (
    <Box sx={{height: "100%", overflow: "hidden", width: "100%"}}>
      {isLayerSelected ? <LayerSettings /> : <Usage />}
    </Box>
  );
};
