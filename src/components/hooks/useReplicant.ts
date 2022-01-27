import {cloneDeep} from "lodash";
import {useEffect, useState} from "react";
import {ReplicantMap} from "../../replicant/ReplicantMap";

export const useReplicant = <TName extends keyof ReplicantMap & string>(
  name: TName,
) => {
  const [value, setValue] = useState<ReplicantMap[TName]>();

  useEffect(() => {
    const r = window.api.replicant(name);
    const u = r.subscribe((n) => setValue(cloneDeep(n)));
    return () => u();
  }, [name]);

  return value;
};
