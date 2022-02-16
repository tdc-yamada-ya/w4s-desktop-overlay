import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";

import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerVisible} from "./hooks/useUpdateLayerVisible";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.visible;
};

const Field = ({id}: {id?: string}) => {
  const [value, setValue] = useState(false);
  const currentValue = useValue(id);
  const update = useUpdateLayerVisible(id);

  useEffect(() => setValue(currentValue ?? false), [currentValue]);

  return (
    <ToggleButtonGroup
      color='primary'
      value={value}
      exclusive
      onChange={(_, v) => update(v as boolean)}
    >
      <ToggleButton value={true}>
        <VisibilityIcon />
        &nbsp;Visible
      </ToggleButton>
      <ToggleButton value={false}>
        <VisibilityOffIcon />
        &nbsp;Hide
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export const LayerVisibleInputSection = ({id}: {id?: string}) => (
  <InputSection label='Visibility' description='Shows or hides the layer.'>
    <Field id={id} />
  </InputSection>
);
