const DEFAULT_STREAM_SEPARATOR = '\n\n';
const DEFAULT_PART_SEPARATOR = '\n';
const DEFAULT_KV_SEPARATOR = ':';

// 工具函数
const isValidString = (str: string) => (str ?? '').trim() !== '';

/**
 * 流分割转换函数
 * 将输入的字符串流按DEFAULT_STREAM_SEPARATOR分割成独立的事件部分
 * 维护一个缓冲区来处理不完整的块
 */
function splitStream() {
  let buffer = '';

  return new TransformStream<string, string>({
    // 处理输入块，分割并输出完整的事件部分
    transform(chunk, controller) {
      buffer += chunk;
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR);
      parts.slice(0, -1).forEach((part) => {
        if (isValidString(part))
          controller.enqueue(part);
      });
      buffer = parts[parts.length - 1];
    },
    // 处理流结束时的剩余数据
    flush(controller) {
      if (isValidString(buffer))
        controller.enqueue(buffer);
    },
  });
}

/**
 * 事件字段解析转换函数
 * 将分割后的事件部分按行分割，并解析为键值对对象
 */
function splitPart() {
  return new TransformStream<string, SSEOutput>({
    // 处理事件部分，解析为SSEOutput对象
    transform(partChunk, controller) {
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR);
      const sseEvent = lines.reduce<SSEOutput>((acc, line) => {
        const sepIndex = line.indexOf(DEFAULT_KV_SEPARATOR);
        if (sepIndex === -1)
          return acc;

        const key = line.slice(0, sepIndex);
        if (!isValidString(key))
          return acc;

        const value = line.slice(sepIndex + 1);
        return { ...acc, [key]: value };
      }, {});

      if (Object.keys(sseEvent).length > 0)
        controller.enqueue(sseEvent);
    },
  });
}

// 类型定义
export type SSEFields = 'data' | 'event' | 'id' | 'retry';
export type SSEOutput = Partial<Record<SSEFields, any>>;

// 流选项接口：包含可读流和可选的转换流
export interface XStreamOptions<Output = SSEOutput> {
  readableStream: ReadableStream<Uint8Array>;
  transformStream?: TransformStream<string, Output>;
}

// 扩展可读流类型：支持异步迭代和中断
type XReadableStream<R = SSEOutput> = ReadableStream<R> & {
  [Symbol.asyncIterator]: () => AsyncGenerator<R>;
  reader?: ReadableStreamDefaultReader<R>;
};

/**
 * 核心流处理函数
 * 将输入的可读流转换为支持异步迭代和中断的XReadableStream
 */
function XStream<Output = SSEOutput>(
  options: XStreamOptions<Output>,
  signal?: AbortSignal, // 可选的中断信号
): XReadableStream<Output> {
  const { readableStream, transformStream } = options;
  if (!(readableStream instanceof ReadableStream)) {
    throw new TypeError('options.readableStream 必须是 ReadableStream 的实例。');
  }

  const decoderStream = new TextDecoderStream();
  const processedStream = transformStream
    ? readableStream
        .pipeThrough(decoderStream) // 先解码为文本
        .pipeThrough(transformStream) // 再通过自定义转换流
    : readableStream
      .pipeThrough(decoderStream) // 解码为文本
      .pipeThrough(splitStream()) // 分割流
      .pipeThrough(splitPart()) as XReadableStream<Output>; // 解析事件

  // 为流添加异步迭代器实现并处理中断信号
  (processedStream as XReadableStream<Output>)[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader();
    (this as XReadableStream<Output>).reader = reader; // 保存读取器引用
    try {
      while (true) {
        // 检查中断信号
        if (signal?.aborted) {
          await reader.cancel(); // 主动取消 reader
          break;
        }
        const { done, value } = await reader.read();
        if (done)
          break;
        if (value)
          yield value;
      }
    }
    finally {
      reader.releaseLock(); // 释放锁
    }
  };

  return processedStream as XReadableStream<Output>;
}

// Vue3 Hook：封装流式处理功能
export function useXStream() {
  const data = ref<SSEOutput[]>([]);
  const error = ref<Error | null>(null);
  const isLoading = ref<boolean>(false);
  const abortController = shallowRef<AbortController | null>(null);
  const currentStream = shallowRef<XReadableStream<SSEOutput> | null>(null);

  /**
   * 启动流式请求
   * @param options 流选项对象
   */
  const startStream = async (options: XStreamOptions<SSEOutput>) => {
    isLoading.value = true;
    error.value = null;
    data.value = [];
    abortController.value = new AbortController();
    currentStream.value = XStream(options, abortController.value.signal);

    try {
      // 异步迭代流数据
      for await (const item of currentStream.value!) {
        data.value.push(item);
      }
    }
    catch (err) {
      // 处理错误
      if (err instanceof Error) {
        error.value = err;
      }
    }
    finally {
      isLoading.value = false;
      currentStream.value = null; // 释放流引用
      abortController.value = null; // 释放控制器
    }
  };

  /**
   * 中断流式请求
   */
  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort();
    }
  };

  return {
    startStream,
    cancel, // 新增中断方法
    data,
    error,
    isLoading,
  };
}
