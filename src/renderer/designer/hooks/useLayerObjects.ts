import {fabric} from "fabric";
import {isEqual, union} from "lodash";
import {useMemo, useRef} from "react";

import {Bounds} from "../../../replicant/Bounds";
import {Layers} from "../../../replicant/Layers";
import {createLayerObject} from "../createLayerObject";

type ObjectMap = {[id: string]: fabric.Object};

export const useLayerObjects = ({
  layers = {},
  onBounds,
  onSelected,
}: {
  layers?: Layers;
  onBounds?: (id: string, bounds: Bounds) => void;
  onSelected?: (id: string) => void;
}): fabric.Object[] => {
  const map = useRef<ObjectMap>({});

  return useMemo(() => {
    const objects: fabric.Object[] = [];
    const nextMap: ObjectMap = {};

    const ids = union(Object.keys(layers), Object.keys(map.current));

    for (const id of ids) {
      const object = map.current[id];
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

        objects.push(object);
        nextMap[id] = object;
      } else {
        const object = createLayerObject({
          layer,
          onBounds: (bounds) => onBounds?.(id, bounds),
          onSelected: () => onSelected?.(id),
        });

        objects.push(object);
        nextMap[id] = object;
      }
    }

    map.current = nextMap;

    return objects;
  }, [layers, onBounds, onSelected]);
};
