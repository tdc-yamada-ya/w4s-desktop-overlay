import {Box} from "@mui/system";

import {LayerListPane} from "./LayerListPane";

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
    <LayerListPane />
  </Box>
);
