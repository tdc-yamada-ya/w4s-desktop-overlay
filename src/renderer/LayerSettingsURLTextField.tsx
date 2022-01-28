import {Box, TextField} from "@mui/material";
import {useEffect, useState} from "react";

import {updateLayerSettingsURL} from "../logic/updateLayerSettingsURL";
import {useLayer} from "./hooks/useLayer";
import {updateOverlay} from "./replicant/updateOverlay";

const useCurrentValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.settingsURL;
};

export const LayerSettingsURLTextField = ({id}: {id?: string}) => {
  const [value, setValue] = useState("");
  const currentValue = useCurrentValue(id);

  useEffect(() => setValue(currentValue ?? ""), [currentValue]);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <form
        style={{width: "100%"}}
        onSubmit={(e) => {
          e.preventDefault();
          if (id) updateOverlay((o) => updateLayerSettingsURL(o, id, value));
          return false;
        }}
      >
        <TextField
          sx={{width: "100%"}}
          label='Settings URL'
          value={value}
          variant='standard'
          helperText='If a URL exists for the configuration, you can set it; if you set a URL, you can view the configuration page from the "Web" tab.'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
    </Box>
  );
};
