import {Slider} from "@mui/material";
import {useEffect, useState} from "react";

import {updateLayerOpacity} from "../logic/updateLayerOpacity";
import {useOverlay} from "./hooks/useOverlay";
import {updateOverlay} from "./replicant/updateOverlay";

export const LayerOpacitySlider = ({id}: {id: string}) => {
  const [value, setValue] = useState(0);
  const opacity = useOverlay()?.layers?.[id]?.opacity;

  useEffect(() => setValue((opacity ?? 0) * 100), [opacity]);

  return (
    <Slider
      sx={{width: "100%"}}
      value={value}
      onChange={(_, n) => setValue(n as number)}
      onChangeCommitted={() =>
        updateOverlay((o) => updateLayerOpacity(o, id, value / 100))
      }
    />
  );
};
