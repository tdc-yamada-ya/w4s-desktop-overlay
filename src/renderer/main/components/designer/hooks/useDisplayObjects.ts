import {useMemo} from "react";

import {Display} from "../../../../../common/replicant/Display";
import {createDisplayObject} from "../createDisplayObject";

export type DisplayObjects = {[id: string]: fabric.Object};

export const useDisplayObjects = ({
  displays = [],
}: {
  displays?: Display[];
}): DisplayObjects => {
  const objects = useMemo(() => {
    const nextObjects = Object.fromEntries(
      displays.map((display, index) => {
        const id = index + 1;
        return [id.toString(), createDisplayObject({display, id})];
      }),
    );
    return nextObjects;
  }, [displays]);

  return objects;
};
