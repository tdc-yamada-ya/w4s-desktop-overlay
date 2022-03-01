import {Box} from "@mui/material";

import {AutoSubmitTextField} from "./AutoSubmitTextField";
import {InputSection} from "./InputSection";
import {ShowLayerSettingsWindowButton} from "./ShowLayerSettingsWindowButton";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerSettingsURL} from "./hooks/useUpdateLayerSettingsURL";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.settingsURL;
};

export const LayerSettingsURLField = ({id}: {id?: string}) => {
  const value = useValue(id);
  const update = useUpdateLayerSettingsURL(id);

  return (
    <AutoSubmitTextField
      value={value}
      onSubmit={(value) => update(value)}
      placeholder='https://example.com/settings'
    />
  );
};

export const LayerSettingsURLInputSection = ({id}: {id?: string}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
      <InputSection
        label='Settings URL'
        description='If a URL exists for the configuration, you can set it.'
      >
        <LayerSettingsURLField id={id} />
      </InputSection>
      <Box sx={{display: "flex"}}>
        <ShowLayerSettingsWindowButton id={id} />
      </Box>
    </Box>
  );
};
