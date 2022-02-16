import {Replicant} from "../../common/lib/electron-replicant/Replicant";
import {LayerConfig} from "../../common/replicant/LayerConfig";
import {ReplicantMap} from "../../common/replicant/ReplicantMap";

export interface API {
  replicant: <TName extends keyof ReplicantMap & string>(
    name: TName,
  ) => Replicant<ReplicantMap[TName]>;

  reload: (id: string) => void;

  help: () => void;

  subscribeOpenLayer: (listener: (layer: LayerConfig) => void) => () => void;
}
