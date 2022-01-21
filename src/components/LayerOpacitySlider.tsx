import {Slider} from "@mui/material";
import {useEffect, useState} from "react";
import {useOverlay} from "./hooks/useOverlay";
import {updateLayerOpacity} from "./lib/updateLayerOpacity";
import {updateOverlay} from "./lib/updateOverlay";

export const LayerOpacitySlider = ({id}: {id: string}) => {
  const [value, setValue] = useState(0);
  const opacity = useOverlay()?.layers?.[id]?.opacity;

  useEffect(() => setValue((opacity ?? 0) * 100), [opacity]);

  return (
    <Slider
      sx={{maxWidth: "200px"}}
      value={value}
      onChange={(_, n) => setValue(n as number)}
      onChangeCommitted={() =>
        updateOverlay((o) => updateLayerOpacity(o, id, value / 100))
      }
    />
  );
};
