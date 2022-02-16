import {MappingFunction} from "../../../common/replicant/update";
import {update} from "./update";

export const updateOverlay = (callback: MappingFunction<"overlay">) =>
  update("overlay", callback);
