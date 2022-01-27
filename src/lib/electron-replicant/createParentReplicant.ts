import {Replicant} from "./Replicant";
import EventEmitter from "events";
import {MessageSender} from "./MessageSender";
import {MessageSubscriber} from "./MessageSubscriber";
import {ReplicantMap} from "./ReplicantMap";
import {BuildChannelNames, createBuildChannelNames} from "./ChannelNames";

export type Persistence<
  TMap extends ReplicantMap,
  TName extends keyof ReplicantMap & string,
> = {
  delete(name: TName): void;
  set(name: TName, data: TMap[TName]): void;
  get(name: TName): TMap[TName];
};

export type HasSender = {
  sender: MessageSender;
};

export const createParentReplicant = <
  TMap extends ReplicantMap,
  TName extends keyof TMap & string,
>(
  name: TName,
  {
    buildChannelNames = createBuildChannelNames(),
    persistence,
    senders,
    subscriber,
  }: {
    buildChannelNames?: BuildChannelNames;
    persistence?: Persistence<TMap, TName>;
    senders: () => MessageSender[];
    subscriber: MessageSubscriber<HasSender>;
  },
): Replicant<TMap[TName]> => {
  let snapshot: TMap[TName] | undefined;

  const emitter = new EventEmitter();

  const channelNames = buildChannelNames(name);

  const get = () => snapshot;

  const set = (n: TMap[TName]) => {
    const o = snapshot;
    snapshot = n;
    senders().forEach((t) => t.send(channelNames.data, n, o));

    if (persistence) {
      if (n !== undefined) persistence.set(name, n);
      else persistence.delete(name);
    }

    emitter.emit("change", n, o);
  };

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

  subscriber.on(channelNames.get, (e) =>
    e.sender.send(channelNames.data, snapshot, snapshot),
  );

  subscriber.on(channelNames.set, (_, n) => set(n as TMap[TName]));

  if (persistence) {
    set(persistence.get(name));
  }

  return {get, set, subscribe};
};
