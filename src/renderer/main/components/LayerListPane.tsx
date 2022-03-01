import {Box, Divider, Typography} from "@mui/material";

import {AddLayerButton} from "./AddLayerButton";
import {LayerList} from "./LayerList";

export const LayerListPane = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          padding: "0.2rem 0.5rem 0.2rem 1rem",
        }}
      >
        <Box sx={{flexGrow: 1}}>
          <Typography
            sx={{
              fontSize: "0.7rem",
              opacity: "0.6",
              textTransform: "uppercase",
            }}
          >
            Layers
          </Typography>
        </Box>
        <Box>
          <AddLayerButton />
        </Box>
      </Box>
      <Divider />
      <Box sx={{flexGrow: 1, overflow: "auto"}}>
        <LayerList />
      </Box>
    </Box>
  );
};
