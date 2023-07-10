import {CSSProperties, useEffect, useRef, useState} from "react";

import {useLocalStorageStateAsJSON} from "../../../common/components/hooks/useLocalStorageStateAsJSON";
import {Preferences} from "../../common/Preferences";

export const App = () => {
  const [preferences, _] =
    useLocalStorageStateAsJSON<Preferences>("preferences");
  const [windowId, setWindowId] = useState(preferences?.windowId);
  const [cropL] = useState<number>(preferences?.CropL ?? 0);
  const [cropT] = useState<number>(preferences?.CropT ?? 0);
  const [cropR] = useState<number>(preferences?.CropR ?? 0);
  const [cropD] = useState<number>(preferences?.CropD ?? 0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: windowId,
            },
          } as any,
        });
        handleStream(stream);
      } catch (e) {
        handleError(e);
      }
    })();
  }, [windowId]);

  function handleStream(stream: MediaStream) {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = (_: any) => videoRef.current?.play();
    }
  }

  function handleError(e: any) {
    console.error("errorGetUserMedia", e);
  }

  useEffect(() => {
    setWindowId(preferences?.windowId ?? "");
  }, [preferences]);

  const style: CSSProperties = {
    clipPath: `inset(${cropT}px ${cropR}px ${cropD}px ${cropL}px)`,
    objectFit: "fill",
    width: "100%",
  };

  return <video style={style} ref={videoRef} />;
};
