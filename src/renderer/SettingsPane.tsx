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

import {DeleteSelectedLayerButton} from "./DeleteSelectedLayerButton";
import {ReloadSelectedLayerButton} from "./ReloadSelectedLayerButton";
import {SelectedLayerSettingsURLTextField} from "./SelectedLayerSettingsURLTextField";
import {SelectedLayerTitleTextField} from "./SelectedLayerTitleTextField";
import {SelectedLayerURLTextField} from "./SelectedLayerURLTextField";
import {ToggleSelectedLayerAudioMutedButton} from "./ToggleSelectedLayerAudioMutedButton";
import {ToggleSelectedLayerLayoutingModeButton} from "./ToggleSelectedLayerLayoutingModeButton";
import {ToggleSelectedLayerVisibleButton} from "./ToggleSelectedLayerVisibleButton";
import {WebSettingsFrame} from "./WebSettingsFrame";
import {useSelectedLayer} from "./hooks/useSelectedLayer";

const useSelectedLayerTitle = () => {
  const l = useSelectedLayer();
  return l?.title;
};

const LayerTitle = () => {
  const t = useSelectedLayerTitle() || "No Title";
  return (
    <Typography sx={{fontSize: "1.2rem", fontWeight: "bold"}}>{t}</Typography>
  );
};

const TabPanel = ({
  children,
  tab,
  value,
}: {
  children?: ReactNode;
  tab?: number;
  value?: number;
}) => {
  const s = value === tab;

  return (
    <Box sx={{height: "100%", width: "100%"}} hidden={!s}>
      {s && children}
    </Box>
  );
};

const SettingsTabs = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Tabs
        sx={{margin: "0 1rem"}}
        value={value}
        onChange={(_, v) => setValue(v)}
      >
        <Tab label='General' />
        <Tab label='Web' />
      </Tabs>
      <Divider />
      <Box sx={{flexGrow: 1}}>
        <TabPanel tab={0} value={value}>
          <General />
        </TabPanel>
        <TabPanel tab={1} value={value}>
          <Web />
        </TabPanel>
      </Box>
    </Box>
  );
};

const General = () => {
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
            <ReloadSelectedLayerButton />
            <ToggleSelectedLayerVisibleButton />
            <ToggleSelectedLayerAudioMutedButton />
            <ToggleSelectedLayerLayoutingModeButton />
            <Box sx={{flexGrow: 1}} />
            <DeleteSelectedLayerButton />
          </Box>
        </Box>
        <Divider />
      </Box>
      <Container sx={{margin: "0 auto", padding: "1rem"}} maxWidth='md'>
        <Stack spacing={2}>
          <SelectedLayerTitleTextField />
          <SelectedLayerURLTextField />
          <SelectedLayerSettingsURLTextField />
        </Stack>
      </Container>
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

export const SettingsPane = () => {
  const selectedLayer = useSelectedLayer();

  return selectedLayer ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box>
        <Box sx={{padding: "1rem 1rem 0 1rem"}}>
          <LayerTitle />
        </Box>
      </Box>
      <Box sx={{flexGrow: 1}}>
        <SettingsTabs />
      </Box>
    </Box>
  ) : null;
};
