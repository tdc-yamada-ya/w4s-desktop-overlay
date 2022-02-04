import EventEmitter from "events";
import {clamp} from "lodash";

import {Zooming} from "./Zooming";

export const createZooming = (options?: {
  max?: number;
  min?: number;
}): Zooming => {
  const {max, min} = {
    max: 20,
    min: 0.01,
    ...options,
  };

  const emitter = new EventEmitter();
  emitter.setMaxListeners(Infinity);

  return {
    on(_event, listener) {
      emitter.on("zoom", listener);
    },
    off(_event, listener) {
      emitter.off("zoom", listener);
    },
    zoom({deltaY, offsetX, offsetY, zoom: currentZoom}) {
      const value = clamp(currentZoom * 0.999 ** deltaY, min, max);
      emitter.emit("zoom", {
        offsetX,
        offsetY,
        zoom: value,
      });
    },
  };
};
