import {fabric} from "fabric";
import {useCallback, useState} from "react";

import {attachPanning} from "../pan/attachPanning";
import {createPanning} from "../pan/createPanning";
import {attachZooming} from "../zoom/attachZooming";
import {createZooming} from "../zoom/createZooming";

export const useCanvas = ({
  height = 400,
  width = 400,
}: {
  height?: number;
  width?: number;
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

  const ref = useCallback(
    (targetElement: HTMLDivElement | null) => {
      if (!targetElement) return;

      const canvasElement = document.createElement("canvas");
      while (targetElement.firstChild)
        targetElement.removeChild(targetElement.firstChild);
      targetElement.appendChild(canvasElement);

      const canvas = new fabric.Canvas(canvasElement, {
        backgroundColor: "#eeeeee",
        fireMiddleClick: true,
        fireRightClick: true,
        height,
        hoverCursor: "pointer",
        preserveObjectStacking: true,
        selection: false,
        width,
      });

      attachPanning({canvas, panning: createPanning()});
      attachZooming({canvas, zooming: createZooming()});

      setCanvas(canvas);
    },
    [height, width],
  );

  return [ref, canvas] as const;
};
