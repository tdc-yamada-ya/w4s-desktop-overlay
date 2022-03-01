import moment from "moment";

export type Zone = {
  name: string;
  offset: number;
};

const createZoneMap = (): {[name: string]: Zone} => {
  return Object.fromEntries(
    moment.tz.names().map((name) => {
      const zone = moment.tz.zone(name);

      const tempOffset = zone?.offsets[0];
      const offset = tempOffset ? -Math.floor(tempOffset / 30) * 30 : 0;

      return [name, {name, offset}];
    }),
  );
};

const zoneMap = createZoneMap();

export const getZoneNames = () => Object.keys(zoneMap);

export const getZones = () => Object.values(zoneMap);

export const getZone = (name: string) => zoneMap[name];

export const formatZoneOffset = (offset = 0): string => {
  const absOffset = Math.abs(offset);

  const sign = offset >= 0;
  const hours = Math.floor(absOffset / 60);
  const minutes = Math.floor((Math.floor(absOffset / 30) * 30) % 60);

  const strSign = sign ? "+" : "-";
  const strHours = hours.toString().padStart(2, "0");
  const strMinutes = minutes.toString().padStart(2, "0");

  return `${strSign}${strHours}:${strMinutes}`;
};
