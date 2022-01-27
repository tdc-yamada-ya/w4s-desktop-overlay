import {Replicant} from "./Replicant";
import {ReplicantMap} from "./ReplicantMap";

export type ReplicantFactory<TMap extends ReplicantMap> = {
  createReplicant<TName extends keyof TMap & string>(
    name: TName,
  ): Replicant<TMap[TName]>;
};
