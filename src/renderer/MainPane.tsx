import ReplayIcon from "@mui/icons-material/Replay";
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {ReactNode, useRef, useState} from "react";

import {DeleteLayerButton} from "./DeleteLayerButton";
import {DeleteLayerInputSection} from "./DeleteLayerInputSection";
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
import {ToggleLayerVisibleButton} from "./ToggleLayerVisibleButton";
import {WebSettingsFrame} from "./WebSettingsFrame";
import {useIsLayerSelected} from "./hooks/useIsLayerSelected";
import {useSelectedLayerID} from "./hooks/useSelectedLayerID";
import {useSelectedLayerTitle} from "./hooks/useSelectedLayerTitle";

const Guide = () => {
  const id = useSelectedLayerID();
  return (
    <Box sx={{height: "100%", overflow: "auto", width: "100%"}}>
      <FirstSteps id={id} />
    </Box>
  );
};

const General = () => {
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
      <Box>
        <Box sx={{backgroundColor: "#eee"}}>
          <Box
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            <ReloadLayerButton id={id} />
            <ToggleLayerVisibleButton id={id} />
            <ToggleLayerAudioMutedButton id={id} />
            <ToggleLayerLayoutingModeButton id={id} />
            <Box sx={{flexGrow: 1}} />
            <DeleteLayerButton id={id} />
          </Box>
        </Box>
        <Divider />
      </Box>
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

const Web = () => {
  const [url, setURL] = useState("");
  const ref = useRef<() => void>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box>
        <Box sx={{backgroundColor: "#eee"}}>
          <Box
            sx={{
              alignItems: "center",
              boxSizing: "border-box",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              width: "100%",
            }}
          >
            <IconButton onClick={() => ref.current?.()}>
              <ReplayIcon />
            </IconButton>
            <InputBase sx={{flexGrow: 1}} disabled={true} value={url} />
          </Box>
        </Box>
        <Divider />
      </Box>
      <WebSettingsFrame ref={ref} onChange={(url) => setURL(url)} />
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
        <Tab label='Web' value='web' />
      </Tabs>
      <Divider />
      <Box sx={{flexGrow: 1, overflow: "hidden"}}>
        <LayerSettingsTabPanel tab='guide' value={tab}>
          <Guide />
        </LayerSettingsTabPanel>
        <LayerSettingsTabPanel tab='general' value={tab}>
          <General />
        </LayerSettingsTabPanel>
        <LayerSettingsTabPanel tab='web' value={tab}>
          <Web />
        </LayerSettingsTabPanel>
      </Box>
    </Box>
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
    <Box sx={{padding: "0.5rem 1rem 0 1rem"}}>
      <LayerTitle />
    </Box>
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
