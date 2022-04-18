import {fabric} from "fabric";

import {PanListener, Panning} from "./Panning";

export const attachPanning = ({
  buttons = [0, 1, 2],
  canvas,
  panning,
}: {
  buttons?: number[];
  canvas: fabric.Canvas;
  panning: Panning;
}) => {
  const buttonSet = new Set(buttons);
  let button = 0;

  const isTargetButton = (button: number) => buttonSet.has(button);

  const down = ({e}: fabric.IEvent<MouseEvent>) => {
    if (canvas.getActiveObject() || !isTargetButton(e.button)) return;

    panning.start({x: e.clientX, y: e.clientY});
    button = e.button;

    e.preventDefault();
    e.stopPropagation();
  };

  const move = ({e}: fabric.IEvent<MouseEvent>) => {
    if (!panning.isPanning()) return;

    panning.moveTo({x: e.clientX, y: e.clientY});

    e.preventDefault();
    e.stopPropagation();
  };

  const up = ({e}: fabric.IEvent<MouseEvent>) => {
    if (!panning.isPanning()) return;
    if (e.button !== button) return;

    panning.stop();

    e.preventDefault();
    e.stopPropagation();
  };

  const pan: PanListener = (l) => {
    canvas.relativePan({x: l.delta.x, y: l.delta.y});
  };

  canvas.on("mouse:down", down);
  canvas.on("mouse:move", move);
  canvas.on("mouse:up", up);
  panning.on("pan", pan);
};
