import {fabric} from "fabric";
import {useCallback, useEffect, useState} from "react";

import {attachPanning} from "../pan/attachPanning";
import {createPanning} from "../pan/createPanning";
import {attachZooming} from "../zoom/attachZooming";
import {createZooming} from "../zoom/createZooming";

const useDelayState = <T>(state: T, timeout: number): T => {
  const [current, setCurrent] = useState(state);

  useEffect(() => {
    const id = window.setTimeout(() => setCurrent(state), timeout);
    return () => window.clearTimeout(id);
  }, [state, timeout]);

  return current;
};

export const useCanvas = ({
  height = 400,
  width = 400,
}: {
  height?: number;
  width?: number;
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const currentHeight = useDelayState(height, 20);
  const currentWidth = useDelayState(width, 20);

  const ref = useCallback(
    (targetElement: HTMLDivElement | null) => {
      if (!targetElement) return;

      const canvasElement = document.createElement("canvas");
      while (targetElement.firstChild)
        targetElement.removeChild(targetElement.firstChild);
      targetElement.appendChild(canvasElement);

      const canvas = new fabric.Canvas(canvasElement, {
        backgroundColor: "#eee",
        fireMiddleClick: true,
        fireRightClick: true,
        height: currentHeight,
        hoverCursor: "pointer",
        preserveObjectStacking: true,
        selection: false,
        width: currentWidth,
      });

      attachPanning({canvas, panning: createPanning()});
      attachZooming({canvas, zooming: createZooming()});

      setCanvas(canvas);
    },
    [currentHeight, currentWidth],
  );

  return [ref, canvas] as const;
};
