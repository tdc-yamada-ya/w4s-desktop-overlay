export type Replicant<TValue> = {
  set(value: TValue): void;
  get(): TValue | undefined;
  subscribe(listener: (n: TValue | undefined, o?: TValue) => void): () => void;
};
