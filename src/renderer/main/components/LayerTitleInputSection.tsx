import {AutoSubmitTextField} from "./AutoSubmitTextField";
import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerTitle} from "./hooks/useUpdateLayerTitle";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.title;
};

export const LayerTitleInputSection = ({id}: {id?: string}) => {
  const update = useUpdateLayerTitle(id);
  const value = useValue(id);

  return (
    <InputSection label='Title' description='Enter the layer title.'>
      <AutoSubmitTextField
        value={value}
        placeholder='Layer Title'
        onSubmit={(value) => update(value)}
      />
    </InputSection>
  );
};
