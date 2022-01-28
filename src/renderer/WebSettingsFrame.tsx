import {forwardRef, useImperativeHandle, useRef} from "react";

import {useSelectedLayer} from "./hooks/useSelectedLayer";

const useCurrentValue = () => {
  const layer = useSelectedLayer();
  return layer?.settingsURL;
};

export const WebSettingsFrame = forwardRef<
  () => void,
  {
    onChange?: (url: string) => void;
  }
>(({onChange}, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const value = useCurrentValue();

  useImperativeHandle(ref, () => () => {
    const e = iframeRef.current;
    if (!e) return;
    e.src = e.src;
  });

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
