export type ChannelNames = {
  data: string;
  get: string;
  set: string;
};

export type BuildChannelNames = (name: string) => ChannelNames;

export const createBuildChannelNames = (options?: {
  prefix?: string;
  getSuffix?: string;
  setSuffix?: string;
  separator?: string;
}): BuildChannelNames => {
  return (name: string) => {
    const prefix = options?.prefix ?? "rep";
    const getSuffix = options?.getSuffix ?? "g";
    const setSuffix = options?.setSuffix ?? "s";
    const separator = options?.separator ?? ":";

    const data = [prefix, name].join(separator);
    const get = [data, getSuffix].join(separator);
    const set = [data, setSuffix].join(separator);

    return {data, get, set};
  };
};
