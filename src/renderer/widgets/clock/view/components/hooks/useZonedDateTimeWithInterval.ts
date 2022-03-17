import moment from "moment";
import {useMemo} from "react";

import {DateTime} from "../../../common/DateTime";
import {useEpochMillisecondsWithInterval} from "./useEpochMillisecondsWithInterval";

export const useZonedDateTimeWithInterval = (
  zoneName: string,
  nowEpochMilliSeconds: () => number,
  interval: number,
): DateTime => {
  const value = useEpochMillisecondsWithInterval(
    nowEpochMilliSeconds,
    interval,
  );

  return useMemo(() => {
    if (zoneName) {
      const m = moment(value).tz(zoneName, false);
      return {
        year: m.year(),
        month: m.month(),
        date: m.date(),
        hours: m.hour(),
        minutes: m.minute(),
        seconds: m.second(),
        milliseconds: m.millisecond(),
        weekday: m.weekday(),
      };
    } else {
      const d = new Date(value);
      return {
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        milliseconds: d.getMilliseconds(),
        weekday: d.getDay(),
      };
    }
  }, [value, zoneName]);
};
