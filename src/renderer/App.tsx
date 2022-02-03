import {Box, Divider} from "@mui/material";

import {MainPane} from "./MainPane";
import {OpenLayerDialog} from "./OpenLayerDialog";
import {SidePane} from "./SidePane";

export const App = () => (
  <Box
    sx={{
      height: "100vh",
      width: "100%",
    }}
  >
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "300px 1px 1fr",
        gridTemplateRows: "100%",
        height: "100%",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <SidePane />
      <Divider orientation='vertical' flexItem />
      <MainPane />
    </Box>
    <OpenLayerDialog />
  </Box>
);
