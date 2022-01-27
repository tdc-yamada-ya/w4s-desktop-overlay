import {Box, TextField} from "@mui/material";
import {useEffect, useState} from "react";

import {updateLayerTitle} from "../logic/updateLayerTitle";
import {useLayer} from "./hooks/useLayer";
import {updateOverlay} from "./replicant/updateOverlay";

const useCurrentValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.title;
};

export const LayerTitleTextField = ({id}: {id?: string}) => {
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
          if (id) updateOverlay((o) => updateLayerTitle(o, id, value));
          return false;
        }}
      >
        <TextField
          sx={{width: "100%"}}
          label='Layer Title'
          value={value}
          variant='standard'
          helperText='Enter the layer title.'
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </form>
    </Box>
  );
};
