import {Box, Skeleton, Stack, Typography, useTheme} from "@mui/material";

import {AddLayerButton} from "./AddLayerButton";
import {SideLayerListItem} from "./SideLayerListItem";
import {useOverlay} from "./hooks/useOverlay";

const Loading = () => (
  <Stack sx={{margin: "1rem"}} spacing={2}>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </Stack>
);

const NoLayers = () => {
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

export const SideLayerList = () => {
  const overlay = useOverlay();
  const layers = overlay?.layers;
  const entries =
    layers &&
    Object.entries(layers).sort(
      ([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0),
    );

  return entries == null ? (
    <Loading />
  ) : entries.length === 0 ? (
    <NoLayers />
  ) : (
    <Stack>
      {entries.map(([id, layer]) => (
        <Box key={id}>
          <SideLayerListItem id={id} layer={layer} />
        </Box>
      ))}
    </Stack>
  );
};
