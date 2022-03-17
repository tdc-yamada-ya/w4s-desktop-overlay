export type AlarmTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type DateTime = {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;

  weekday: number;
};

export const convertDateTimeToJsDate = (value: DateTime) =>
  new Date(
    value.year,
    value.month,
    value.date,
    value.hours,
    value.minutes,
    value.seconds,
    value.milliseconds,
  );
