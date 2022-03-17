import {Box} from "@mui/material";

import {Bell} from "./Bell";
import {useAlarmAudio} from "./hooks/useAlarmAudio";

export const Alarm = () => {
  useAlarmAudio();

  return (
    <Box
      sx={{
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: "0.5rem",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Bell />
    </Box>
  );
};
