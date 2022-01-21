export type Bounds = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type LayerConfig = {
  audioMuted?: boolean;
  bounds?: Bounds;
  display?: number;
  index?: number;
  opacity?: number;
  url?: string;
  visible?: boolean;
};

export type OverlayConfig = {
  layers?: {
    [key: string]: LayerConfig;
  };
};

export type Display = {
  bounds?: Bounds;
};

export type ScreenConfig = {
  displays?: Display[];
};

export type ReplicantMap = {
  overlay?: OverlayConfig;
  screen?: ScreenConfig;
};

export type ReplicantName = keyof ReplicantMap & string;
