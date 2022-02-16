import {DeleteLayerButton} from "./DeleteLayerButton";
import {InputSection} from "./InputSection";

export const DeleteLayerInputSection = ({id}: {id?: string}) => (
  <InputSection
    label='Delete Layer'
    description='Once a layer is deleted, it cannot be undone.'
  >
    <DeleteLayerButton id={id} variant='standard' />
  </InputSection>
);
