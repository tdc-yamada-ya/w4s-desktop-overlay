import {Box} from "@mui/material";
import "moment-timezone";
import Clock from "react-clock";

import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageStateAsJSON";
import {Preferences} from "../../common/Preferences";
import {DateLabel} from "./DateLabel";
import {TimeLabel} from "./TimeLabel";
import {ZoneLabel} from "./ZoneLabel";
import {useZonedDateWithInterval} from "./hooks/useZonedDateWithInterval";

export const App = () => {
  const [preferences] = useLocalStorageStateAsJSON<Preferences>("preferences");
  const date = useZonedDateWithInterval(
    preferences?.zoneName ?? "",
    Date.now,
    500,
  );

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#ddd",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Clock value={date} />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
          }}
        >
          <DateLabel value={date} />
          <TimeLabel value={date} />
          <ZoneLabel value={preferences?.zoneName} />
        </Box>
      </Box>
    </Box>
  );
};
