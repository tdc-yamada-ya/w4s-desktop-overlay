import {Box} from "@mui/material";

import {Alarm} from "./Alarm";

export const AlarmOverlay = ({visible}: {visible: boolean}) => {
  return visible ? (
    <Box
      sx={{
        height: "100%",
        left: "0",
        position: "absolute",
        top: "0",
        width: "100%",
      }}
    >
      <Alarm />
    </Box>
  ) : null;
};
