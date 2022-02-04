export type ZoomEvent = {
  offsetX: number;
  offsetY: number;
  zoom: number;
};

export type ZoomListener = (e: ZoomEvent) => void;

export type Zooming = {
  zoom(e: {
    deltaY: number;
    offsetX: number;
    offsetY: number;
    zoom: number;
  }): void;
  on(event: "zoom", listener: ZoomListener): void;
  off(event: "zoom", listener: ZoomListener): void;
};
