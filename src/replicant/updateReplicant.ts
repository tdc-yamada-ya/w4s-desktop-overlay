import {Replicant} from "../lib/electron-replicant/Replicant";

export const updateReplicant = <TValue>(
  rep: Replicant<TValue>,
  f: (o: TValue | undefined) => TValue,
) => rep.set(f(rep.get()));
