import {Bounds} from "../../../common/replicant/Bounds";

export type LayerWindow = {
  destroy(): void;
  reload(): void;
  setAudioMuted(v: boolean): void;
  setBounds(v: Bounds): void;
  setCSS(v: string): void;
  setOpacity(v: number): void;
  setURL(v: string): void;
  setVisible(v: boolean): void;
};
