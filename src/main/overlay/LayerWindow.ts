import {Bounds} from "../../common/replicant/Bounds";

export type LayerWindow = {
  destroy(): void;
  reload(): void;
  setURL(v: string): void;
  setAudioMuted(v: boolean): void;
  setBounds(v: Bounds): void;
  setCSS(v: string): void;
  setOpacity(v: number): void;
  setVisible(v: boolean): void;
};
