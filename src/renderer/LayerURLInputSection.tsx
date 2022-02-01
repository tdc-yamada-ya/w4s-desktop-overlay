import {AutoSubmitTextField} from "./AutoSubmitTextField";
import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerURL} from "./hooks/useUpdateLayerURL";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.url;
};

export const LayerURLInputSection = ({id}: {id?: string}) => {
  const value = useValue(id);
  const update = useUpdateLayerURL(id);

  return (
    <InputSection
      label='Graphics URL'
      description='Enter an URL of the web page you want to overlay on your desktop.'
    >
      <AutoSubmitTextField
        value={value}
        onSubmit={(value) => update(value)}
        placeholder='https://example.com/graphics'
      />
    </InputSection>
  );
};
