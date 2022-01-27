import {OverlayConfig} from "../../replicant/OverlayConfig";
import {updateReplicant} from "./updateReplicant";

export const updateOverlay = (
  f: (o: OverlayConfig | undefined) => OverlayConfig,
) => updateReplicant("overlay", f);
