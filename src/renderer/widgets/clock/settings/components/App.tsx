import {LocalizationProvider, TimePicker} from "@mui/lab";
import AdapterMoment from "@mui/lab/AdapterMoment";
import {Box, Container, Stack, TextField, Typography} from "@mui/material";
import {merge} from "lodash";
import moment, {Moment} from "moment";
import "moment-timezone";
import {Fragment, useEffect, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import {DelayAutoComplete} from "../../../common/components/DelayAutoComplete";
import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageStateAsJSON";
import {AlarmTime} from "../../common/DateTime";
import {Preferences} from "../../common/Preferences";
import {formatZoneOffset, getZone, getZoneNames} from "../../common/tz";

const convertAlarmTimeToMoment = (value: AlarmTime) =>
  moment({
    hours: value.hours,
    minutes: value.minutes,
    seconds: value.seconds,
  });

export const App = () => {
  const [preferences, setPreferences] =
    useLocalStorageStateAsJSON<Preferences>("preferences");
  const [zoneName, setZoneName] = useState(preferences?.zoneName);
  const [alarmAt, setAlarmAt] = useState<Moment | null>(null);

  useEffect(() => {
    setZoneName(preferences?.zoneName ?? "");
    setAlarmAt(
      preferences?.alarmAt
        ? convertAlarmTimeToMoment(preferences.alarmAt)
        : null,
    );
  }, [preferences]);

  const zoneNames = getZoneNames();
  const formatLabel = (name: string) =>
    name ? `${name} (${formatZoneOffset(getZone(name)?.offset)})` : "";

  const save = (diff: Partial<Preferences>) =>
    setPreferences(merge(preferences, diff));

  return (
    <HelmetProvider>
      <Fragment>
        <Helmet>
          <title>Built-in Clock Settings</title>
        </Helmet>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Container sx={{height: "100%", overflow: "auto", p: 4}}>
            <Stack spacing={2}>
              <Box>
                <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                  Clock Preferences
                </Typography>
              </Box>
              <Stack spacing={4}>
                <DelayAutoComplete
                  label='Timezone'
                  getOptionLabel={formatLabel}
                  onChange={(zoneName) => save({zoneName})}
                  options={zoneNames}
                  value={zoneName}
                />
                <TimePicker
                  ampm={false}
                  clearable={true}
                  label='Alarm'
                  value={alarmAt}
                  onChange={(v) =>
                    save({
                      alarmAt: v
                        ? {
                            hours: v.hour() || 0,
                            minutes: v.minute() || 0,
                            seconds: v.second() || 0,
                          }
                        : null,
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant='standard' />
                  )}
                />
              </Stack>
            </Stack>
          </Container>
        </LocalizationProvider>
      </Fragment>
    </HelmetProvider>
  );
};
