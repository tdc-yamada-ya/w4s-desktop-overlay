import EventEmitter from "events";
import {clone} from "lodash";

import {PanEvent, Panning, Point} from "./Panning";

export const createPanning = (): Panning => {
  let panning = false;
  let currentPoint: Point = {
    x: 0,
    y: 0,
  };
  const emitter = new EventEmitter();

  emitter.setMaxListeners(Infinity);

  return {
    isPanning() {
      return panning;
    },
    start(l) {
      currentPoint = clone(l);
      panning = true;
    },
    on(_event, listener) {
      emitter.on("moved", listener);
    },
    off(_event, listener) {
      emitter.off("moved", listener);
    },
    moveTo(point) {
      if (!panning) return;

      const e: PanEvent = {
        delta: {
          x: point.x - currentPoint.x,
          y: point.y - currentPoint.y,
        },
      };

      emitter.emit("moved", e);

      currentPoint = clone(point);
    },
    stop() {
      panning = false;
    },
  };
};
