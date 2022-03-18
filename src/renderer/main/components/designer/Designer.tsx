import PanToolIcon from "@mui/icons-material/PanTool";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import {Box, Typography} from "@mui/material";
import {useEffect} from "react";
import useDimensions from "react-cool-dimensions";

import {Bounds} from "../../../../common/replicant/Bounds";
import {Display} from "../../../../common/replicant/Display";
import {LayerMap} from "../../../../common/replicant/LayerMap";
import {useOverlay} from "../hooks/useOverlay";
import {useScreen} from "../hooks/useScreen";
import {useSelectLayer} from "../hooks/useSelectLayer";
import {useUpdateLayerBoundsWithID} from "../hooks/useUpdateLayerBounds";
import {useCanvas} from "./hooks/useCanvas";
import {useDisplayObjects} from "./hooks/useDisplayObjects";
import {useLayerObjects} from "./hooks/useLayerObjects";
import {useWholeView} from "./hooks/useWholeView";
import {syncObjects} from "./syncObjects";

export const CanvasContainer = ({
  displays,
  layers,
  onBounds,
  onSelected,
  options,
}: {
  displays?: Display[];
  layers?: LayerMap;
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

const Guide = () => {
  return (
    <table
      css={{
        margin: "0.5rem",
        opacity: 0.5,
        "tr:not(:first-of-type)": {
          marginBottom: "0.2rem",
        },
        td: {
          paddingRight: "0.4rem",
          verticalAlign: "center",
        },
        "td:first-of-type": {
          textAlign: "right",
        },
      }}
    >
      <tbody>
        <tr>
          <td>
            <PanToolIcon sx={{fontSize: "0.9rem"}} />
          </td>
          <td>
            <Typography>Mouse Drag</Typography>
          </td>
          <td>
            <Typography>Move the canvas or layer.</Typography>
          </td>
        </tr>
        <tr>
          <td>
            <ZoomInIcon sx={{fontSize: "1rem", marginRight: "-0.1rem"}} />
          </td>
          <td>
            <Typography>Mouse Wheel</Typography>
          </td>
          <td>
            <Typography>Zoom in and out.</Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const Designer = () => {
  const overlay = useOverlay();
  const screen = useScreen();
  const {observe, width, height} = useDimensions();
  const update = useUpdateLayerBoundsWithID();
  const selectLayer = useSelectLayer();

  return (
    <Box ref={observe} sx={{height: "100%", width: "100%"}}>
      <CanvasContainer
        displays={screen?.displays}
        layers={overlay?.layers}
        onBounds={(id, bounds) => update(id, bounds)}
        onSelected={(id) => selectLayer(id)}
        options={{
          height,
          width,
        }}
      />
      <Box sx={{bottom: 0, left: 0, position: "absolute"}}>
        <Guide />
      </Box>
    </Box>
  );
};
