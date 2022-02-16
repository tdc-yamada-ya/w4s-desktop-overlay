import {cloneDeep} from "lodash";
import {useEffect, useState} from "react";

import {ReplicantMap} from "../../../../common/replicant/ReplicantMap";

export const useReplicant = <TName extends keyof ReplicantMap & string>(
  name: TName,
) => {
  const [value, setValue] = useState<ReplicantMap[TName]>();

  useEffect(() => {
    let mounted = true;

    const rep = window.api.replicant(name);

    const unsubscribe = rep.subscribe((n) => {
      if (!mounted) return;
      setValue(cloneDeep(n));
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [name]);

  return value;
};
