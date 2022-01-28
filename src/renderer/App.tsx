import {Box, Divider} from "@mui/material";

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
        width: "100%",
      }}
    >
      <Box sx={{height: "100%", width: "100%"}}>
        <SideNavigation />
      </Box>
      <Divider orientation='vertical' flexItem />
      <Box sx={{height: "100%", width: "100%"}}>
        <SettingsPane />
      </Box>
    </Box>
  </Box>
);
