import {Box, InputBase} from "@mui/material";
import {merge} from "lodash";
import {FormEventHandler, useState} from "react";
import {OverlayConfig} from "../replicant/OverlayConfig";

const modifyLayerURL = (id: string, url?: string) => {
  const r = window.api.replicant("overlay");
  const o = r.get();
  const d: OverlayConfig = {
    layers: {
      [id]: {
        url,
      },
    },
  };
  const n = merge(o, d);
  r.set(n);
};

export const LayerURLInputField = ({
  id,
  url: initialURL,
}: {
  id: string;
  url?: string;
}) => {
  const [url, setUrl] = useState(initialURL);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    modifyLayerURL(id, url);
    return false;
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <form style={{width: "100%"}} onSubmit={onSubmit}>
        <InputBase
          sx={{width: "100%"}}
          placeholder='Enter website URL to overlay.'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </form>
    </Box>
  );
};
