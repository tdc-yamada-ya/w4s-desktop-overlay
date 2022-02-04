import {fabric} from "fabric";
import {isEqual} from "lodash";
import {useEffect, useMemo, useRef} from "react";

import {Bounds} from "../../../replicant/Bounds";

export const wholeBounds = (
  bounds?: Bounds[],
): {
  x: number;
  y: number;
  width: number;
  height: number;
} => {
  const t = (bounds ?? []).reduce(
    (p, c) => {
      const x = c?.x ?? 0;
      const y = c?.y ?? 0;
      const width = c?.width ?? 0;
      const height = c?.height ?? 0;

      const top = y;
      const right = x + width;
      const bottom = y + height;
      const left = x;

      return {
        top: Math.min(p.top, top),
        right: Math.max(p.right, right),
        bottom: Math.max(p.bottom, bottom),
        left: Math.min(p.left, left),
      };
    },
    {top: 0, right: 0, bottom: 0, left: 0},
  );

  return {
    x: t.left,
    y: t.top,
    width: t.right - t.left,
    height: t.bottom - t.top,
  };
};

export const useWholeView = ({
  bounds,
  canvas,
}: {
  bounds?: Bounds[];
  canvas?: fabric.Canvas;
}) => {
  const cache = useRef<Bounds[]>();
  const current = useMemo(() => {
    if (isEqual(bounds, cache.current)) {
      return cache.current;
    }
    cache.current = bounds;
    return bounds;
  }, [bounds]);

  useEffect(() => {
    if (!canvas) return;

    const {x: wbx, y: wby, width: wbw, height: wbh} = wholeBounds(current);
    const cw = canvas.width ?? 0;
    const ch = canvas.height ?? 0;

    const zoom = Math.min(cw / wbw, ch / wbh) * 0.9;
    const x = (wbx - (cw / zoom - wbw) / 2) * zoom;
    const y = (wby - (ch / zoom - wbh) / 2) * zoom;

    canvas.setZoom(zoom);
    canvas.absolutePan({x, y});
  }, [canvas, current]);
};
