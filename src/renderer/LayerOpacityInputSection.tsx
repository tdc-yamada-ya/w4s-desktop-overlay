import {InputSection} from "./InputSection";
import {LayerOpacitySlider} from "./LayerOpacitySlider";

export const LayerOpacityInputSection = ({id}: {id?: string}) => (
  <InputSection
    label='Opacity'
    description='Set opacity to show windows behind the layer.'
  >
    <LayerOpacitySlider id={id} />
  </InputSection>
);
