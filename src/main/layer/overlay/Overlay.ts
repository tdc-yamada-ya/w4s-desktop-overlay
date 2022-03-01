import {OverlaySettings} from "../../../common/replicant/OverlaySettings";

export type Overlay = {
  apply(settings?: OverlaySettings): void;
  reload(id: string): void;
};
