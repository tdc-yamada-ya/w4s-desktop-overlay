import {Box} from "@mui/material";
import "moment-timezone";
import {useMemo} from "react";
import Clock from "react-clock";

import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageStateAsJSON";
import {convertDateTimeToJsDate} from "../../common/DateTime";
import {Preferences} from "../../common/Preferences";
import {AlarmOverlay} from "./AlarmOverlay";
import {AlarmTimeLabel} from "./AlarmTimeLabel";
import {DateLabel} from "./DateLabel";
import {TimeLabel} from "./TimeLabel";
import {ZoneLabel} from "./ZoneLabel";
import {useAlarm} from "./hooks/useAlarm";
import {useZonedDateTimeWithInterval} from "./hooks/useZonedDateTimeWithInterval";

const interval = 200;
const alarmTimeout = 5000;

export const App = () => {
  const [preferences] = useLocalStorageStateAsJSON<Preferences>("preferences");
  const currentDateTime = useZonedDateTimeWithInterval(
    preferences?.zoneName ?? "",
    Date.now,
    interval,
  );
  const alarm = useAlarm({
    currentDateTime,
    alarmAt: preferences?.alarmAt,
    timeout: alarmTimeout,
  });

  const jsDate = useMemo(
    () => convertDateTimeToJsDate(currentDateTime),
    [currentDateTime],
  );

  return (
    <Box
      sx={{
        alignItems: "center",
        background: "#ece9e6",
        borderRadius: "0.5rem",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        gap: "0.5rem",
        justifyContent: "center",
        overflow: "hidden",
        padding: "1rem",
        width: "100%",
        "> *": {
          flexShrink: 0,
        },
      }}
    >
      <Clock value={jsDate} />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <DateLabel value={currentDateTime} />
        <TimeLabel value={currentDateTime} />
        {preferences?.alarmAt ? (
          <AlarmTimeLabel value={preferences.alarmAt} />
        ) : null}
        <ZoneLabel value={preferences?.zoneName} />
      </Box>
      <AlarmOverlay visible={alarm} />
    </Box>
  );
};
