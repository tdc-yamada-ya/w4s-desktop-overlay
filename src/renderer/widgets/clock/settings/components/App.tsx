import {
  Autocomplete,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {isEqual, merge} from "lodash";
import "moment-timezone";
import {Fragment, useEffect, useRef, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageState";
import {Preferences} from "../../common/Properties";
import {formatZoneOffset, getZone, getZoneNames} from "../../common/tz";

const useDelayedState = <T,>(
  initialState: T,
  delay: number,
  onChange: (state: T) => void,
): [T, (state: T) => void] => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const id = window.setTimeout(() => onChange(state), delay);
    return () => window.clearTimeout(id);
  }, [state, delay, onChange]);

  return [state, setState];
};

const DelayAutoComplete = ({
  delay = 1000,
  getOptionLabel,
  label,
  onChange,
  options,
  value: initialValue = "",
}: {
  delay?: number;
  getOptionLabel?: (v: string) => string;
  label?: string;
  onChange?: (v: string) => void;
  options: ReadonlyArray<string>;
  value?: string;
}) => {
  const [value, setValue] = useDelayedState(initialValue, delay, (value) => {
    onChange?.(value);
  });

  return (
    <Autocomplete
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option === value}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label={label} variant='standard' />
      )}
      onChange={(_e, value) => setValue(value ?? "")}
      value={value}
    />
  );
};

export const App = () => {
  const oldProps = useRef<Preferences | null>(null);
  const [preferences, setPreferences] =
    useLocalStorageStateAsJSON<Preferences>("preferences");
  const [zoneName, setZoneName] = useState(preferences?.zoneName);

  useEffect(() => {
    if (isEqual(oldProps.current, preferences)) return;

    setZoneName(preferences?.zoneName ?? "");

    oldProps.current = preferences;
  }, [preferences]);

  const zoneNames = getZoneNames();
  const formatLabel = (name: string) =>
    name ? `${name} (${formatZoneOffset(getZone(name)?.offset)})` : "";

  const save = (diff: Partial<Preferences>) => {
    setPreferences(merge(preferences, diff));
  };

  return (
    <HelmetProvider>
      <Fragment>
        <Helmet>
          <title>Built-in Clock Settings</title>
        </Helmet>
        <Container sx={{height: "100%", overflow: "auto", p: 4}}>
          <Stack spacing={2}>
            <Box>
              <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                Clock Preferences
              </Typography>
            </Box>
            <DelayAutoComplete
              label='Timezone'
              getOptionLabel={formatLabel}
              onChange={(zoneName) => save({zoneName})}
              options={zoneNames}
              value={zoneName}
            />
          </Stack>
        </Container>
      </Fragment>
    </HelmetProvider>
  );
};
