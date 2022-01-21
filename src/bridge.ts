import {Replicant} from "./lib/ts-electron-replicant/Replicant";
import {ReplicantMap} from "./replicant/replicants";

export interface API {
  replicant: <TName extends keyof ReplicantMap & string>(
    name: TName,
  ) => Replicant<ReplicantMap[TName]>;
  reload: (id: string) => void;
  help: () => void;
  subscribeVersion: (listener: (version: string) => void) => () => void;
}
