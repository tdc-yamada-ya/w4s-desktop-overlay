import moment from "moment";
import {useMemo} from "react";

import {useEpochMillisecondsWithInterval} from "./useEpochMillisecondsWithInterval";

export const useZonedDateWithInterval = (
  zoneName: string,
  nowEpochMilliSeconds: () => number,
  interval: number,
) => {
  const value = useEpochMillisecondsWithInterval(
    nowEpochMilliSeconds,
    interval,
  );

  const date = useMemo(() => {
    if (!zoneName) return new Date(value);

    const m = moment(value).tz(zoneName, false);
    return new Date(
      m.year(),
      m.month(),
      m.date(),
      m.hour(),
      m.minute(),
      m.second(),
      m.millisecond(),
    );
  }, [value, zoneName]);

  return date;
};
