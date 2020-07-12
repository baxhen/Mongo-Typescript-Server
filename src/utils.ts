export interface MyCallback<T> {
  (error: Error | null, result: T): void;
}
