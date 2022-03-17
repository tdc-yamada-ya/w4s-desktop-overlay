import {useState} from "react";

import {useInterval} from "../../../../common/components/hooks/useInterval";

export const useEpochMillisecondsWithInterval = (
  nowEpochMilliSeconds: () => number,
  interval: number,
) => {
  const [value, setValue] = useState(nowEpochMilliSeconds());

  useInterval(() => {
    const newValue = nowEpochMilliSeconds();
    if (value === newValue) return;
    setValue(newValue);
  }, interval);

  return value;
};
