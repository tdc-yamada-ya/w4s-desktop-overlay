import {Box} from "@mui/material";
import {AddLayerButton} from "./AddLayerButton";
import {HelpButton} from "./HelpButton";
import {LayerList} from "./LayerList";

export const App = () => (
  <Box
    sx={{
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      padding: "1rem",
    }}
  >
    <Box sx={{display: "flex"}}>
      <AddLayerButton />
      <Box sx={{flexGrow: 1}} />
      <HelpButton />
    </Box>
    <LayerList />
  </Box>
);
