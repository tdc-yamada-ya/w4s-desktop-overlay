import {fabric} from "fabric";
import {isEqual, union} from "lodash";
import {useMemo, useRef} from "react";

import {Bounds} from "../../../../../common/replicant/Bounds";
import {LayerMap} from "../../../../../common/replicant/LayerMap";
import {createLayerObject} from "../createLayerObject";

export type LayerObjects = {[id: string]: fabric.Object};

export const useLayerObjects = ({
  layers = {},
  onBounds,
  onSelected,
}: {
  layers?: LayerMap;
  onBounds?: (id: string, bounds: Bounds) => void;
  onSelected?: (id: string) => void;
}): LayerObjects => {
  const oldObjects = useRef<LayerObjects>({});

  const objects = useMemo(() => {
    const nextObjects: LayerObjects = {};
    const ids = union(Object.keys(layers), Object.keys(oldObjects.current));

    for (const id of ids) {
      const object = oldObjects.current[id];
      const layer = layers[id];

      if (!layer) continue;

      if (object) {
        const b = {
          x: object.left,
          y: object.top,
          width: object.width,
          height: object.height,
        };

        if (!isEqual(b, layer.bounds)) {
          object.left = layer.bounds?.x;
          object.top = layer.bounds?.y;
          object.width = layer.bounds?.width;
          object.height = layer.bounds?.height;
        }

        nextObjects[id] = object;
      } else {
        const object = createLayerObject({
          layer,
          onBounds: (bounds) => onBounds?.(id, bounds),
          onSelected: () => {
            onSelected?.(id);
          },
        });

        nextObjects[id] = object;
      }
    }

    oldObjects.current = nextObjects;
    return nextObjects;
  }, [layers, onBounds, onSelected]);

  return objects;
};
