import {
  Box,
  Container,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import {DesktopCapturerSource} from "electron";
import {merge} from "lodash";
import {Fragment, useEffect, useState} from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageStateAsJSON";
import {Preferences} from "../../common/Preferences";

export const App = () => {
  const [preferences, setPreferences] =
    useLocalStorageStateAsJSON<Preferences>("preferences");
  const [windowId, setWindowId] = useState(preferences?.windowId);
  const [selects, setSelects] = useState<DesktopCapturerSource[]>([]);
  const [cropL, setCropL] = useState<number>(1);
  const [cropT, setCropT] = useState<number>(1);
  const [cropR, setCropR] = useState<number>(1);
  const [cropD, setCropD] = useState<number>(1);

  const [layerId, setLayerId] = useState<string | null>(null);

  useEffect(() => {
    setWindowId(preferences?.windowId ?? "");
    setCropL(preferences?.CropL ?? 0);
    setCropT(preferences?.CropT ?? 0);
    setCropR(preferences?.CropR ?? 0);
    setCropD(preferences?.CropD ?? 0);
  }, [preferences]);

  useEffect(() => {
    (async () => {
      const ids = await window.api.fetchWindowIds();
      setSelects(ids);
    })();
    (async () => {
      const id = await window.api.getCurrentLayerId();
      setLayerId(id);
    })();
  }, []);
  const reload = () => {
    if (layerId != null) {
      window.api.reload(layerId);
    }
  };
  const save = (diff: Partial<Preferences>) => {
    setPreferences(merge(preferences, diff));
  };
  const saveRange = (k: string, n: number | number[]) => {
    const v = Array.isArray(n) ? n[0]! : n!;
    save({[k]: v});
  };

  return (
    <HelmetProvider>
      <Fragment>
        <Helmet>
          <title>Window Capture Settings</title>
        </Helmet>
          <Container sx={{height: "100%", overflow: "auto", p: 4}}>
            <Stack spacing={2}>
              <Box>
                <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                  Window Capture Preferences
                </Typography>
              </Box>
              <Stack spacing={4}>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={windowId}
                  label='Age'
                  onChange={(v) => {
                    save({windowId: v.target.value});
                  }}
                >
                  {selects.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
              <Stack spacing={4}>
                <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                  Left
                </Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={cropL}
                  min={0}
                  max={500}
                  onChange={(_, v) => saveRange("CropL", v)}
                  onChangeCommitted={() => reload()}
                  valueLabelDisplay='auto'
                />
                <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                  Right
                </Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={cropR}
                  min={0}
                  max={500}
                  onChange={(_, v) => saveRange("CropR", v)}
                  onChangeCommitted={() => reload()}
                  valueLabelDisplay='auto'
                />
                <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                  Top
                </Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={cropT}
                  min={0}
                  max={500}
                  onChange={(_, v) => saveRange("CropT", v)}
                  onChangeCommitted={() => reload()}
                  valueLabelDisplay='auto'
                />
                <Typography sx={{opacity: 0.5, textTransform: "uppercase"}}>
                  Down
                </Typography>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={cropD}
                  min={0}
                  max={500}
                  onChange={(_, v) => saveRange("CropD", v)}
                  onChangeCommitted={() => reload()}
                  valueLabelDisplay='auto'
                />
              </Stack>
            </Stack>
          </Container>
      </Fragment>
    </HelmetProvider>
  );
};
