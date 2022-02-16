import {Replicant} from "./Replicant";
import {ReplicantFactory} from "./ReplicantFactory";
import {ReplicantMap} from "./ReplicantMap";

export const createCachedReplicantFactory = <TMap extends ReplicantMap>(
  factory: ReplicantFactory<TMap>,
): ReplicantFactory<TMap> => {
  const cache: {
    [TName in keyof TMap & string]?: Replicant<TMap[TName]>;
  } = {};

  return {
    createReplicant(n) {
      const c = cache[n];
      if (c) return c;
      const r = factory.createReplicant(n);
      cache[n] = r;
      return r;
    },
  };
};
