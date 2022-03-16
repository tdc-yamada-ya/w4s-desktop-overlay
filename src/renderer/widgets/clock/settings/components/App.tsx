import {Box, Container, Stack, Typography} from "@mui/material";
import {merge} from "lodash";
import "moment-timezone";
import {Fragment, useEffect, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import {DelayAutoComplete} from "../../../common/components/DelayAutoComplete";
import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageStateAsJSON";
import {Preferences} from "../../common/Preferences";
import {formatZoneOffset, getZone, getZoneNames} from "../../common/tz";

export const App = () => {
  const [preferences, setPreferences] =
    useLocalStorageStateAsJSON<Preferences>("preferences");
  const [zoneName, setZoneName] = useState(preferences?.zoneName);

  useEffect(() => {
    setZoneName(preferences?.zoneName ?? "");
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
