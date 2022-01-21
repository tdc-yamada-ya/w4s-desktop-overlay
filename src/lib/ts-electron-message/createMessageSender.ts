import {BaseMessageSender} from "./BaseMessageSender";
import {MessageMap} from "./MessageMap";
import {MessageSender} from "./MessageSender";

export const createMessageSender = <TMap extends MessageMap>({
  sender,
}: {
  sender: BaseMessageSender;
}): MessageSender<TMap> => sender as MessageSender<TMap>;
