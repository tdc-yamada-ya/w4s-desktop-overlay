import {AlarmTime} from "./DateTime";

export type Preferences = {
  zoneName?: string;
  alarmAt?: AlarmTime | null;
};
