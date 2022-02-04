import {Box, Typography} from "@mui/material";

import {AnimatedIcon} from "./AnimatedIcon";

export const LayerWindowGuide = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        margin: "2rem",
      }}
    >
      <AnimatedIcon height='8rem' width='8rem' />
      <Typography sx={{opacity: 0.6}}>This is layer window.</Typography>
      <Typography sx={{opacity: 0.6}}>
        Graphics URL is not set. Please set the URL in the main window. When you
        close this window, the layer will be in overlay mode.
      </Typography>
    </Box>
  );
};
