import {useEffect, useState} from "react";

import {AlarmTime, DateTime} from "../../../common/DateTime";

export const useAlarm = ({
  currentDateTime,
  alarmAt,
  timeout,
}: {
  currentDateTime: DateTime;
  alarmAt?: AlarmTime | null;
  timeout: number;
}) => {
  const [alarm, setAlarm] = useState(false);

  useEffect(() => {
    if (
      currentDateTime.hours !== alarmAt?.hours ||
      currentDateTime.minutes !== alarmAt?.minutes ||
      currentDateTime.seconds !== alarmAt?.seconds
    )
      return;
    setAlarm(true);
  }, [
    alarmAt?.hours,
    alarmAt?.minutes,
    alarmAt?.seconds,
    currentDateTime.hours,
    currentDateTime.minutes,
    currentDateTime.seconds,
  ]);

  useEffect(() => {
    if (!alarm) return;
    const id = window.setTimeout(() => setAlarm(false), timeout);
    return () => window.clearTimeout(id);
  }, [alarm, timeout]);

  return alarm;
};
