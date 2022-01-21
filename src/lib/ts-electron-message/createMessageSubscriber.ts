import {BaseMessageSubscriber} from "./BaseMessageSubscriber";
import {MessageMap} from "./MessageMap";
import {MessageSubscriber} from "./MessageSubscriber";

export const createMessageSubscriber = <TMap extends MessageMap, TEvent>({
  subscriber,
}: {
  subscriber: BaseMessageSubscriber<TEvent>;
}): MessageSubscriber<TMap, TEvent> =>
  subscriber as MessageSubscriber<TMap, TEvent>;
