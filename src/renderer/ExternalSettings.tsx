import ReplayIcon from "@mui/icons-material/Replay";
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";

import {useSelectedLayerSettingsURL} from "./hooks/useSelectedLayerSettingsURL";

type ExternalSettingsInlineFrameRef = {
  reload: () => void;
};

const ExternalSettingsInlineFrame = forwardRef<
  ExternalSettingsInlineFrameRef,
  {
    url?: string;
    onChange?: (url: string) => void;
  }
>(function WebSettingsFrameInternal({url, onChange}, ref) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useImperativeHandle(ref, () => ({
    reload() {
      const e = iframeRef.current;
      if (!e) return;
      const u = e.src;
      e.src = u;
    },
  }));

  return (
    <iframe
      ref={iframeRef}
      css={{border: "0", height: "100%", width: "100%"}}
      sandbox='allow-scripts allow-same-origin'
      src={url}
      onLoad={() => onChange?.(iframeRef.current?.src ?? "")}
    />
  );
});

export const Toolbar = ({
  onReload,
  url,
}: {
  onReload: () => void;
  url?: string;
}) => {
  return (
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
          <IconButton onClick={onReload}>
            <ReplayIcon />
          </IconButton>
          <InputBase sx={{flexGrow: 1}} disabled={true} value={url} />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export const Guide = () => {
  return (
    <Box sx={{height: "100%", width: "100%"}}>
      <Container sx={{margin: "2rem auto"}} maxWidth='sm'>
        <Stack spacing={1}>
          <Typography>
            You can display the configuration page created by the widget vendor
            in this tab.
          </Typography>
          <Typography>
            To view the page, enter URL to &quot;Settings URL&quot; on
            &quot;General&quot; tab.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export const ExternalSettings = () => {
  const url = useSelectedLayerSettingsURL();
  const [currentURL, setCurrentURL] = useState("");
  const ref = useRef<ExternalSettingsInlineFrameRef>(null);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      {url ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Toolbar onReload={() => ref.current?.reload()} url={currentURL} />
          <Box sx={{flexGrow: 1}}>
            <ExternalSettingsInlineFrame
              onChange={(url) => setCurrentURL(url)}
              ref={ref}
              url={url}
            />
          </Box>
        </Box>
      ) : (
        <Guide />
      )}
    </Box>
  );
};
