import {useOverlay} from "./useOverlay";

export const useLayer = (id?: string) => {
  const o = useOverlay();
  return id != null ? o?.layers?.[id] : undefined;
};
