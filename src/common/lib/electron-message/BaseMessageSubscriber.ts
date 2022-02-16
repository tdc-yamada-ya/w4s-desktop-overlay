export type BaseMessageSubscriber<TEvent> = {
  on(
    ch: string,
    listener: (event: TEvent, ...args: unknown[]) => void,
  ): unknown;
};
