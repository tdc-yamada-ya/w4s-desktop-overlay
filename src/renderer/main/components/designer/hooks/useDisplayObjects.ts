import {useMemo} from "react";

import {Display} from "../../../../../common/replicant/Display";
import {createDisplayObject} from "../createDisplayObject";

export const useDisplayObjects = ({
  displays = [],
}: {
  displays?: Display[];
}): fabric.Object[] =>
  useMemo(
    () =>
      displays.map((display, index) =>
        createDisplayObject({display, id: index + 1}),
      ),
    [displays],
  );
