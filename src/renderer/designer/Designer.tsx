import {Box} from "@mui/material";
import {useEffect} from "react";
import useDimensions from "react-cool-dimensions";

import {Bounds} from "../../replicant/Bounds";
import {Displays} from "../../replicant/Displays";
import {Layers} from "../../replicant/Layers";
import {useOverlay} from "../hooks/useOverlay";
import {useScreen} from "../hooks/useScreen";
import {useSelectLayer} from "../hooks/useSelectLayer";
import {useUpdateLayerBoundsWithID} from "../hooks/useUpdateLayerBounds";
import {useCanvas} from "./hooks/useCanvas";
import {useDisplayObjects} from "./hooks/useDisplayObjects";
import {useLayerObjects} from "./hooks/useLayerObjects";
import {useWholeView} from "./hooks/useWholeView";
import {syncObjects} from "./syncObjects";

export const DesignerInternal = ({
  displays,
  layers,
  onBounds,
  onSelected,
  options,
}: {
  displays?: Displays;
  layers?: Layers;
  onBounds?: (id: string, bounds: Bounds) => void;
  onSelected?: (id: string) => void;
  options?: {
    height?: number;
    width?: number;
  };
}) => {
  const [ref, canvas] = useCanvas({
    height: options?.height,
    width: options?.width,
  });

  useWholeView({
    bounds: displays?.map((d) => d.bounds ?? {}),
    canvas,
  });

  const doo = useDisplayObjects({displays});
  const loo = useLayerObjects({layers, onBounds, onSelected});

  useEffect(() => {
    syncObjects(canvas, [...doo, ...loo]);
    doo.forEach((o) => o.sendToBack());
    canvas?.requestRenderAll();
  }, [canvas, doo, loo]);

  return <div ref={ref} />;
};

export const Designer = () => {
  const overlay = useOverlay();
  const screen = useScreen();
  const {observe, width, height} = useDimensions();
  const update = useUpdateLayerBoundsWithID();
  const selectLayer = useSelectLayer();

  return (
    <Box ref={observe} sx={{height: "100%", width: "100%"}}>
      <DesignerInternal
        displays={screen?.displays}
        layers={overlay?.layers}
        onBounds={(id, bounds) => update(id, bounds)}
        onSelected={(id) => selectLayer(id)}
        options={{
          height,
          width,
        }}
      />
    </Box>
  );
};
