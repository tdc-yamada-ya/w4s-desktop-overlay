import {forwardRef, useImperativeHandle, useRef} from "react";

import {useSelectedLayer} from "./hooks/useSelectedLayer";

export type WebSettingsFrameRef = {
  reload: () => void;
};

const useCurrentValue = () => {
  const layer = useSelectedLayer();
  return layer?.settingsURL;
};

export const WebSettingsFrame = forwardRef<
  WebSettingsFrameRef,
  {
    onChange?: (url: string) => void;
  }
>(function WebSettingsFrameInternal({onChange}, ref) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const value = useCurrentValue();

  useImperativeHandle(ref, () => ({
    reload() {
      const e = iframeRef.current;
      if (!e) return;
      const u = e.src;
      e.src = u;
    },
  }));

  return (
    <iframe
      ref={iframeRef}
      css={{border: "0", height: "100%", width: "100%"}}
      sandbox='allow-scripts allow-same-origin'
      src={value}
      onLoad={() => onChange?.(iframeRef.current?.src ?? "")}
    />
  );
});
