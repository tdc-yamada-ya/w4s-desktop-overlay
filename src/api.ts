import {Replicant} from "./lib/electron-replicant/Replicant";
import {LayerConfig} from "./replicant/LayerConfig";
import {ReplicantMap} from "./replicant/ReplicantMap";

export interface API {
  replicant: <TName extends keyof ReplicantMap & string>(
    name: TName,
  ) => Replicant<ReplicantMap[TName]>;

  reload: (id: string) => void;

  help: () => void;

  subscribeOpenLayer: (listener: (layer: LayerConfig) => void) => () => void;
}
