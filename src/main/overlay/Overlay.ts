import {OverlayConfig} from "../../common/replicant/OverlayConfig";

export type Overlay = {
  apply(config?: OverlayConfig): void;
  reload(id: string): void;
};
