type OnError = (eventSource: EventSource, event: Event) => void;
type BaseFetchOptions = Omit<RequestInit, "headers" | "signal"> & {
  headers?: HeadersInit | Headers;
};
type Transformer<T> = (message: string) => T;
interface BaseSSEProps<T = string> {
  baseURL?: string;
  type?: SSEType;
  onFinish?: (data: T[]) => void;
  onAbort?: (data: T[]) => void;
  transformer?: Transformer<T>;
  onMessage?: (message: T) => void;
}
interface SSEWithFetchProps {
  baseOptions?: BaseFetchOptions;
  onError?: (e: unknown) => void;
}
interface SSEWithSSEProps {
  baseOptions?: EventSourceInit;
  onError?: OnError;
  onOpen?: () => void;
}
type SSEType = "fetch" | "sse" | "sip";
/**
 * @deprecated 已经废弃, 请使用 hook-fetch 代替
 * @deprecated This class has been deprecated, please use hook-fetch instead.
 *
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch 官方文档}
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch Document}
 */
export type SSEProps<T> = BaseSSEProps<T> &
  (SSEWithSSEProps | SSEWithFetchProps);
/**
 * @deprecated 已经废弃, 请使用 hook-fetch 代替
 * @deprecated This class has been deprecated, please use hook-fetch instead.
 *
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch 官方文档}
 * @see {@link https://jsonlee12138.github.io/hook-fetch/ | hook-fetch Document}
 */
export declare class XRequest<T> {
  #private;
  constructor({
    baseURL,
    onAbort,
    onMessage,
    onError,
    baseOptions,
    transformer,
    type,
    onFinish,
    ...props
  }?: SSEProps<T>);
  send(url: string, options?: EventSourceInit | BaseFetchOptions): this;
  abort(): void;
}
export {};
