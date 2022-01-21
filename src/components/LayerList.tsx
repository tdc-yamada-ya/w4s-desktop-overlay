import {Box, Divider, Typography, useTheme} from "@mui/material";
import {LayerListItem} from "./LayerListItem";
import {useOverlay} from "./hooks/useOverlay";
import {Fragment, ReactNode} from "react";

const Bar = ({children}: {children?: ReactNode}) => (
  <Box
    sx={{
      alignItems: "center",
      backgroundColor: "#eee",
      borderRadius: "1.1rem",
      boxSizing: "border-box",
      display: "flex",
      height: "2.2rem",
      padding: "0 1rem",
    }}
  >
    {children}
  </Box>
);

export const LayerList = () => {
  const overlay = useOverlay();
  const theme = useTheme();
  const entries = Object.entries(overlay?.layers ?? {}).sort(
    ([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0),
  );

  return entries.length >= 1 ? (
    <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
      {entries.map(([id, l], i) => (
        <Fragment key={id}>
          <LayerListItem id={id} index={i} layer={l} />
          <Divider />
        </Fragment>
      ))}
    </Box>
  ) : (
    <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
      <Bar>
        <Typography sx={{color: theme?.palette.text.disabled}}>
          Click &quot;Add Layer&quot; button.
        </Typography>
      </Bar>
      <Bar />
      <Bar />
    </Box>
  );
};
