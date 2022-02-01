import {AutoSubmitTextField} from "./AutoSubmitTextField";
import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerSettingsURL} from "./hooks/useUpdateLayerSettingsURL";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.settingsURL;
};

export const LayerSettingsURLInputSection = ({id}: {id?: string}) => {
  const value = useValue(id);
  const update = useUpdateLayerSettingsURL(id);

  return (
    <InputSection
      label='Settings URL'
      description='If a URL exists for the configuration, you can set it; if you set a URL, you can view the configuration page from the "Web" tab.'
    >
      <AutoSubmitTextField
        value={value}
        onSubmit={(value) => update(value)}
        placeholder='https://example.com/settings'
      />
    </InputSection>
  );
};
