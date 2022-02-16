import {Slider} from "@mui/material";
import {useEffect, useState} from "react";

import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerOpacity} from "./hooks/useUpdateLayerOpacity";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.opacity;
};

export const LayerOpacitySlider = ({
  id,
  size,
}: {
  id?: string;
  size?: "small";
}) => {
  const [value, setValue] = useState(0);
  const currentValue = useValue(id);
  const update = useUpdateLayerOpacity(id);

  useEffect(() => setValue((currentValue ?? 0) * 100), [currentValue]);

  return (
    <Slider
      size={size}
      sx={{width: "100%"}}
      value={value}
      onChange={(_, n) => setValue(n as number)}
      onChangeCommitted={() => update(value / 100)}
    />
  );
};
