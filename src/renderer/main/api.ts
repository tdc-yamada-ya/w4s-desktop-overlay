import {Replicant} from "../../common/lib/electron-replicant/Replicant";
import {LayerProperties} from "../../common/replicant/LayerProperties";
import {ReplicantMap} from "../../common/replicant/ReplicantMap";

export interface API {
  replicant: <TName extends keyof ReplicantMap & string>(
    name: TName,
  ) => Replicant<ReplicantMap[TName]>;

  reload: (id: string) => void;

  subscribeOpenLayer: (
    listener: (layer: LayerProperties) => void,
  ) => () => void;

  showLayerSettingsWindow: (id?: string) => void;
}
