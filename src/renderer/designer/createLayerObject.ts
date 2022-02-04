import {fabric} from "fabric";

import {Bounds} from "../../replicant/Bounds";
import {LayerConfig} from "../../replicant/LayerConfig";

const createCustomProperty = <T>(
  defaultValue: T,
  onChanged?: (newValue: T, oldValue: T) => void,
): PropertyDescriptor => {
  let value: T = defaultValue;

  return {
    get() {
      return value;
    },
    set(newValue: T) {
      const oldValue = value;
      value = newValue;
      onChanged?.(newValue, oldValue);
    },
  };
};

export const createLayerObject = ({
  layer,
  onBounds,
  onSelected,
}: {
  layer?: LayerConfig;
  onBounds?: (bounds: Bounds) => void;
  onSelected?: () => void;
}) => {
  const {x, y, width, height} = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    ...layer?.bounds,
  };

  const r = new fabric.Rect({
    fill: "rgba(0,150,136,0.8)",
    hasBorders: true,
    height,
    originX: "center",
    originY: "center",
    stroke: "#00695c",
    strokeUniform: true,
    width,
  });

  const t = new fabric.Textbox(((layer?.index ?? 0) + 1).toString(), {
    fill: "rgba(255, 255, 255, 0.7)",
    fontFamily: "'Noto Sans JP', Roboto, sans-serif",
    fontSize: 64,
    originX: "center",
    originY: "center",
    textAlign: "center",
    width,
  });

  const g = new fabric.Group([r, t], {
    borderColor: "#ff0000",
    left: x,
    shadow: new fabric.Shadow({
      blur: 16,
      color: "rgba(0, 0, 0, 0.3)",
      offsetX: 16,
      offsetY: 16,
    }),
    top: y,
    width,
    height,
  });

  g.controls = {
    ...fabric.Rect.prototype.controls,
    mtr: new fabric.Control({visible: false}),
  };

  const notifyBounds = () => {
    const b = {
      x: g.left,
      y: g.top,
      width: g.width,
      height: g.height,
    };

    onBounds?.(b);
  };

  g.on("moved", () => {
    notifyBounds();
  });

  g.on("scaled", () => {
    const width = g.getScaledWidth();
    const height = g.getScaledHeight();
    g.set({
      scaleX: 1,
      scaleY: 1,
      width: width,
      height: height,
    });
    notifyBounds();
  });

  g.on("selected", () => onSelected?.());

  Object.defineProperty(
    g,
    "width",
    createCustomProperty(g.width, (n) => {
      r.set("width", n);
      t.set("width", n);
    }),
  );

  Object.defineProperty(
    g,
    "height",
    createCustomProperty(g.height, (n) => {
      r.set("height", n);
    }),
  );

  return g;
};
