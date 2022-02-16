export type MessageSubscriber<TEvent> = {
  on(
    channel: string,
    listener: (event: TEvent, ...args: unknown[]) => void,
  ): unknown;
};
