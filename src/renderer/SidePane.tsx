import {Divider} from "@mui/material";
import {Box} from "@mui/system";

import {AddLayerButton} from "./AddLayerButton";
import {HelpButton} from "./HelpButton";
import {LayerList} from "./LayerList";

const BottomBar = () => (
  <Box
    sx={{
      alignItems: "center",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      padding: "0 1rem",
    }}
  >
    <AddLayerButton />
    <Box sx={{flexGrow: 1}} />
    <HelpButton />
  </Box>
);

export const SidePane = () => (
  <Box
    sx={{
      background: "#eceff1",
      display: "grid",
      gridTemplateColumns: "100%",
      gridTemplateRows: "1fr 1px 4rem",
      height: "100%",
      width: "100%",
    }}
  >
    <Box sx={{height: "100%", overflow: "auto", width: "100%"}}>
      <LayerList />
    </Box>
    <Divider flexItem />
    <BottomBar />
  </Box>
);
