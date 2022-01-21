export type BaseMessageSender = {
  send(ch: string, ...args: unknown[]): unknown;
};
