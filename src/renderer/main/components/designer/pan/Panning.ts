export type Point = {x: number; y: number};

export type PanEvent = {
  delta: Point;
};

export type PanListener = (e: PanEvent) => void;

export type Panning = {
  isPanning(): boolean;
  moveTo(point: Point): void;
  on(event: "pan", listener: PanListener): void;
  off(event: "pan", listener: PanListener): void;
  start(point: Point): void;
  stop(): void;
};
