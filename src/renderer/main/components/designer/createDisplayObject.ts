import {fabric} from "fabric";

import {Display} from "../../../../common/replicant/Display";

export const createDisplayObject = ({
  display,
  id = 0,
}: {
  display?: Display;
  id?: number;
}) => {
  const {x, y, width, height} = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ...display?.bounds,
  };

  const r = new fabric.Rect({
    fill: "rgba(255, 255, 255, 1)",
    hasBorders: true,
    stroke: "rgba(0, 0, 0, 0.5)",
    strokeUniform: true,
    strokeWidth: 2,
    left: 0,
    top: 0,
    width,
    height,
  });

  const t = new fabric.Text(id.toString(), {
    fill: "rgba(0, 0, 0, 0.3)",
    fontFamily: "'Noto Sans JP', Roboto, sans-serif",
    fontSize: 72,
    left: 32,
    textAlign: "justify-center",
    top: 32,
  });

  const g = new fabric.Group([r, t], {
    left: x,
    selectable: false,
    top: y,
    width,
    height,
  });

  return g;
};
