import {ZoomListener, Zooming} from "./Zooming";

export const attachZooming = ({
  canvas,
  zooming,
}: {
  canvas: fabric.Canvas;
  zooming: Zooming;
}) => {
  const wheel = ({e}: fabric.IEvent<WheelEvent>) => {
    zooming.zoom({
      deltaY: e.deltaY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      zoom: canvas.getZoom(),
    });

    e.preventDefault();
    e.stopPropagation();
  };

  const zoom: ZoomListener = ({offsetX, offsetY, zoom}) => {
    canvas.zoomToPoint({x: offsetX, y: offsetY}, zoom);
  };

  canvas.on("mouse:wheel", wheel);
  zooming.on("zoom", zoom);
};
