import {Howl} from "howler";
import {useEffect} from "react";

import bellAudio from "../../../assets/bell.ogg";

const audio = new Howl({
  src: [bellAudio],
  loop: true,
});

export const useAlarmAudio = () => {
  useEffect(() => {
    audio.play();
    return () => void audio.stop();
  }, []);
};
