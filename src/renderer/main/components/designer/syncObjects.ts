import {fabric} from "fabric";

export const syncObjects = (
  canvas?: fabric.Canvas,
  objects?: fabric.Object[],
) => {
  if (!canvas) return;

  const r = canvas.getObjects().filter((o) => !objects?.find((p) => p === o));
  const a = objects?.filter((o) => !canvas.contains(o)) ?? [];

  canvas.remove(...r);
  canvas.add(...a);
};
