import {useMemo} from "react";

import {Displays} from "../../../replicant/Displays";
import {createDisplayObject} from "../createDisplayObject";

export const useDisplayObjects = ({
  displays = [],
}: {
  displays?: Displays;
}): fabric.Object[] =>
  useMemo(
    () =>
      displays.map((display, index) =>
        createDisplayObject({display, id: index + 1}),
      ),
    [displays],
  );
