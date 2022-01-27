import {Box, TextField} from "@mui/material";
import {useEffect, useState} from "react";

import {updateLayerURL} from "../logic/updateLayerURL";
import {useLayer} from "./hooks/useLayer";
import {updateOverlay} from "./replicant/updateOverlay";

const useCurrentURL = (id?: string) => {
  const layer = useLayer(id);
  return layer?.url;
};

export const LayerURLTextField = ({id}: {id?: string}) => {
  const [url, setUrl] = useState("");
  const currentURL = useCurrentURL(id);

  useEffect(() => setUrl(currentURL ?? ""), [currentURL]);

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
          if (id) updateOverlay((o) => updateLayerURL(o, id, url));
          return false;
        }}
      >
        <TextField
          sx={{width: "100%"}}
          label='Graphics URL'
          value={url}
          variant='standard'
          helperText='Enter an URL of the web page you want to overlay on your desktop.'
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </form>
    </Box>
  );
};
