export type MessageSender = {
  send(channel: string, ...args: unknown[]): unknown;
};
