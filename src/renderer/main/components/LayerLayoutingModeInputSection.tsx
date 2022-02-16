import LayersIcon from "@mui/icons-material/Layers";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";

import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerLayoutingMode} from "./hooks/useUpdateLayerLayoutingMode";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.layoutingMode;
};

export const LayerLayoutingModeField = ({id}: {id?: string}) => {
  const [value, setValue] = useState(false);
  const currentValue = useValue(id);
  const update = useUpdateLayerLayoutingMode(id);

  useEffect(() => setValue(currentValue ?? false), [currentValue]);

  return (
    <ToggleButtonGroup
      color='primary'
      value={value}
      exclusive
      onChange={(_, v) => update(v as boolean)}
    >
      <ToggleButton value={false}>
        <LayersClearIcon />
        &nbsp;Disable
      </ToggleButton>
      <ToggleButton value={true}>
        <LayersIcon />
        &nbsp;Enable
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const LayerLayoutingModeInputSection = ({id}: {id?: string}) => (
  <InputSection
    label='Switch Layouting Mode'
    description='If you want to change bounds of a layer directly by dragging and dropping, activate the layout mode.'
  >
    <LayerLayoutingModeField id={id} />
  </InputSection>
);
