import {Divider, Stack} from "@mui/material";
import {Box} from "@mui/system";

import {AddLayerButton} from "./AddLayerButton";
import {HelpButton} from "./HelpButton";
import {LayerList} from "./LayerList";
import {OpenLayoutButton} from "./OpenLayoutButton";

const BottomBar = () => (
  <Stack sx={{boxSizing: "border-box", padding: "0.5rem"}} spacing={0}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <OpenLayoutButton />
      <Box sx={{flexGrow: 1}} />
    </Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AddLayerButton />
      <Box sx={{flexGrow: 1}} />
      <HelpButton />
    </Box>
  </Stack>
);

export const SidePane = () => (
  <Box
    sx={{
      background: "#eceff1",
      display: "grid",
      gridTemplateColumns: "100%",
      gridTemplateRows: "1fr 1px min-content",
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
