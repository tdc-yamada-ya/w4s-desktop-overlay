import {useOverlay} from "./useOverlay";

export const useLayer = (id?: string) => {
  const o = useOverlay();
  if (id == null) return;
  return o?.layers?.[id];
};
