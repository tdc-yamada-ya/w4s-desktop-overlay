import {
  Box,
  Divider,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {Fragment} from "react";

import {AddLayerButton} from "./AddLayerButton";
import {LayerListItem} from "./LayerListItem";
import {useLayers} from "./hooks/useLayers";

const Loading = () => (
  <Stack sx={{margin: "1rem"}} spacing={2}>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </Stack>
);

const Guide = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "1rem",
      }}
    >
      <Typography sx={{color: theme?.palette.text.disabled}}>
        No layers. Click the &quot;Add Layer&quot; button.
      </Typography>
      <AddLayerButton variant='outlined' />
    </Box>
  );
};

export const LayerList = () => {
  const layers = useLayers({sort: true});

  return layers == null ? (
    <Loading />
  ) : layers.length === 0 ? (
    <Guide />
  ) : (
    <Stack>
      {layers.map(([id]) => (
        <Fragment key={id}>
          <LayerListItem id={id} />
          <Divider variant='middle' />
        </Fragment>
      ))}
    </Stack>
  );
};
