import {Stack} from "@mui/material";

import {Bounds} from "../../../common/replicant/Bounds";
import {AutoSubmitTextField} from "./AutoSubmitTextField";
import {InputSection} from "./InputSection";
import {useLayer} from "./hooks/useLayer";
import {useUpdateLayerBounds} from "./hooks/useUpdateLayerBounds";

const useValue = (id?: string) => {
  const layer = useLayer(id);
  return layer?.bounds;
};

const encode = (n?: number) => Math.floor(n ?? 0).toString();

const decode = (v: string) => parseInt(v) || 0;

const Field = ({
  bounds,
  id,
  name,
}: {
  bounds?: Bounds;
  id?: string;
  name: keyof Bounds;
}) => {
  const update = useUpdateLayerBounds(id);

  return (
    <AutoSubmitTextField
      value={encode(bounds?.[name])}
      label={name}
      onSubmit={(value) => update({...bounds, [name]: decode(value)})}
    />
  );
};

export const LayerBoundsInputSection = ({id}: {id?: string}) => {
  const bounds = useValue(id);

  return (
    <InputSection
      label='Bounds'
      description='Set bounds of the layer to be overlaid.'
    >
      <Stack spacing={2} direction='row'>
        <Field name='x' bounds={bounds} id={id} />
        <Field name='y' bounds={bounds} id={id} />
        <Field name='width' bounds={bounds} id={id} />
        <Field name='height' bounds={bounds} id={id} />
      </Stack>
    </InputSection>
  );
};
