import {MessageMap} from "./MessageMap";

export type MessageSubscriber<TMap extends MessageMap, TEvent> = {
  on<TC extends keyof TMap & string>(
    ch: TC,
    listener: (event: TEvent, data: TMap[TC]["data"]) => void,
  ): unknown;
  off<TC extends keyof TMap & string>(
    ch: TC,
    listener: (event: TEvent, data: TMap[TC]["data"]) => void,
  ): unknown;
};
