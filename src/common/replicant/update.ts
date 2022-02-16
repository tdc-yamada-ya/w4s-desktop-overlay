import {Replicant} from "../lib/electron-replicant/Replicant";
import {ReplicantMap} from "./ReplicantMap";
import {ReplicantName} from "./ReplicantName";

export type MappingFunction<TName extends ReplicantName> = (
  o?: ReplicantMap[TName],
) => ReplicantMap[TName];

export type UpdateFunction<TName extends ReplicantName> = (
  name: TName,
  callback: MappingFunction<TName>,
) => void;

export const update = <TName extends ReplicantName>(
  rep: Replicant<ReplicantMap[TName]>,
  callback: MappingFunction<TName>,
) => {
  const o = rep.get();
  const n = callback(o);
  rep.set(n);
};
