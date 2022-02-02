import {Box, Divider} from "@mui/material";

import {OpenLayerDialog} from "./OpenLayerDialog";
import {SettingsPane} from "./SettingsPane";
import {SideNavigation} from "./SideNavigation";

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
      <Box>
        <SideNavigation />
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box>
        <SettingsPane />
      </Box>
      <OpenLayerDialog />
    </Box>
  </Box>
);
