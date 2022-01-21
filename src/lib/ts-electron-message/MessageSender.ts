import {MessageMap} from "./MessageMap";

export type MessageSender<TMap extends MessageMap> = {
  send<TChannel extends keyof TMap>(
    channel: TChannel,
    data?: TMap[TChannel]["data"],
  ): void;
};
