import EventEmitter from "events";

import {BuildChannelNames, createBuildChannelNames} from "./ChannelNames";
import {MessageSender} from "./MessageSender";
import {MessageSubscriber} from "./MessageSubscriber";
import {Replicant} from "./Replicant";
import {ReplicantMap} from "./ReplicantMap";

export const createChildReplicant = <
  TMap extends ReplicantMap,
  TName extends keyof TMap & string,
>(
  name: TName,
  {
    buildChannelNames = createBuildChannelNames(),
    sender,
    subscriber,
  }: {
    buildChannelNames?: BuildChannelNames;
    sender: MessageSender;
    subscriber: MessageSubscriber<unknown>;
  },
): Replicant<TMap[TName]> => {
  let snapshot: TMap[TName] | undefined;

  const emitter = new EventEmitter();

  const channelNames = buildChannelNames(name);

  const get = () => snapshot;

  const set = (v: TMap[TName]) => void sender.send(channelNames.set, v);

  const subscribe = (
    listener: (n: TMap[TName] | undefined, o?: TMap[TName]) => void,
  ) => {
    emitter.on("change", listener);
    return () => emitter.off("change", listener);
  };

  emitter.on("newListener", (event, listener) => {
    if (event === "change") {
      listener(snapshot);
    }
  });

  subscriber.on(channelNames.data, (_, n) => {
    const o = snapshot;
    snapshot = n as TMap[TName];
    emitter.emit("change", snapshot, o);
  });

  sender.send(channelNames.get);

  return {set, get, subscribe};
};
