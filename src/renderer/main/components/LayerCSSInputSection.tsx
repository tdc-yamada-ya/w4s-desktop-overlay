import {AutoSubmitTextField} from "./AutoSubmitTextField";
import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerCSS} from "./hooks/useUpdateLayerCSS";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.css;
};

export const LayerCSSField = ({id}: {id?: string}) => {
  const update = useUpdateLayerCSS(id);
  const value = useValue(id);

  return (
    <AutoSubmitTextField
      value={value}
      multiline={true}
      placeholder='body { background-color: transparent; }'
      onSubmit={(value) => update(value)}
      rows={5}
    />
  );
};

export const LayerCSSInputSection = ({id}: {id?: string}) => (
  <InputSection
    label='Custom CSS'
    description='CSS can be injected to change the look and feel to best suit the overlay.'
  >
    <LayerCSSField id={id} />
  </InputSection>
);
