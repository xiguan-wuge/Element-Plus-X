// 定义默认分隔符常量
const DEFAULT_STREAM_SEPARATOR = '\n\n' // 流级分隔符，用于分割不同的SSE事件
const DEFAULT_PART_SEPARATOR = '\n' // 部分分隔符，用于分割事件中的不同字段
const DEFAULT_KV_SEPARATOR = ':' // 键值分隔符，用于分割字段的键和值

// 工具函数：检查字符串是否有效（非空且非纯空格）
const isValidString = (str: string) => (str ?? '').trim() !== ''

/**
 * 流分割转换函数
 * 将输入的字符串流按DEFAULT_STREAM_SEPARATOR分割成独立的事件部分
 * 维护一个缓冲区来处理不完整的块
 */
function splitStream() {
  let buffer = '' // 用于存储未完全分割的剩余数据

  return new TransformStream<string, string>({
    // 处理输入块，分割并输出完整的事件部分
    transform(chunk, controller) {
      buffer += chunk // 将新数据添加到缓冲区
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR) // 按流分隔符分割
      // 输出除最后一个部分外的所有完整部分
      parts.slice(0, -1).forEach((part) => {
        if (isValidString(part))
          controller.enqueue(part) // 输出有效的事件部分
      })
      buffer = parts[parts.length - 1] // 保留未完全分割的剩余部分
    },
    // 处理流结束时的剩余数据
    flush(controller) {
      if (isValidString(buffer))
        controller.enqueue(buffer) // 输出缓冲区中剩余的有效数据
    },
  })
}

/**
 * 事件字段解析转换函数
 * 将分割后的事件部分按行分割，并解析为键值对对象
 */
function splitPart() {
  return new TransformStream<string, SSEOutput>({
    // 处理事件部分，解析为SSEOutput对象
    transform(partChunk, controller) {
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR) // 按行分割
      // 遍历每一行，解析键值对
      const sseEvent = lines.reduce<SSEOutput>((acc, line) => {
        const sepIndex = line.indexOf(DEFAULT_KV_SEPARATOR) // 查找键值分隔符位置
        if (sepIndex === -1)
          return acc // 没有分隔符则跳过

        const key = line.slice(0, sepIndex) // 提取键
        if (!isValidString(key))
          return acc // 无效键则跳过

        const value = line.slice(sepIndex + 1) // 提取值
        return { ...acc, [key]: value } // 添加到结果对象
      }, {})

      if (Object.keys(sseEvent).length > 0)
        controller.enqueue(sseEvent) // 输出有效的SSE事件对象
    },
  })
}

// 类型定义：SSE支持的字段
export type SSEFields = 'data' | 'event' | 'id' | 'retry'
// 类型定义：SSE输出对象（包含部分SSE字段）
export type SSEOutput = Partial<Record<SSEFields, any>>

// 流选项接口：包含可读流和可选的转换流
export interface XStreamOptions<Output = SSEOutput> {
  readableStream: ReadableStream<Uint8Array> // 必须提供的可读流
  transformStream?: TransformStream<string, Output> // 可选的自定义转换流
}

// 扩展可读流类型：支持异步迭代和中断
type XReadableStream<R = SSEOutput> = ReadableStream<R> & {
  [Symbol.asyncIterator]: () => AsyncGenerator<R> // 异步迭代器
  reader?: ReadableStreamDefaultReader<R> // 流读取器引用
}

/**
 * 核心流处理函数
 * 将输入的可读流转换为支持异步迭代和中断的XReadableStream
 */
function XStream<Output = SSEOutput>(
  options: XStreamOptions<Output>,
  signal?: AbortSignal, // 可选的中断信号
): XReadableStream<Output> {
  const { readableStream, transformStream } = options
  // 验证输入是否为ReadableStream实例
  if (!(readableStream instanceof ReadableStream)) {
    throw new TypeError('options.readableStream 必须是 ReadableStream 的实例。')
  }

  const decoderStream = new TextDecoderStream() // 创建文本解码流
  // 构建处理流管道
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
    const reader = this.getReader(); // 获取流读取器
    (this as XReadableStream<Output>).reader = reader // 保存读取器引用
    try {
      while (true) {
        // 检查中断信号
        if (signal?.aborted) {
          await reader.cancel() // 主动取消读取器
          break
        }
        // 读取流数据
        const { done, value } = await reader.read()
        if (done)
          break // 流结束则退出循环
        if (value)
          yield value // 生成有效数据
      }
    }
    finally {
      reader.releaseLock() // 释放读取器锁
    }
  }

  return processedStream as XReadableStream<Output>
}

// Vue3 Hook：封装流式处理功能
export function useXStream() {
  const data = ref<SSEOutput[]>([]) // 存储接收到的SSE数据
  const error = ref<Error | null>(null) // 存储错误信息
  const isLoading = ref<boolean>(false) // 加载状态
  const abortController = shallowRef<AbortController | null>(null) // 中断控制器
  const currentStream = shallowRef<XReadableStream<SSEOutput> | null>(null) // 当前流引用

  /**
   * 启动流式请求
   * @param options 流选项对象
   */
  const startStream = async (options: XStreamOptions<SSEOutput>) => {
    isLoading.value = true // 设置加载状态
    error.value = null // 清除错误
    data.value = [] // 清空数据
    abortController.value = new AbortController() // 创建中断控制器
    currentStream.value = XStream(options, abortController.value.signal) // 创建流

    try {
      // 异步迭代流数据
      for await (const item of currentStream.value!) {
        data.value.push(item) // 添加到数据数组
      }
    }
    catch (err) {
      // 处理错误
      if (err instanceof Error) {
        error.value = err
      }
    }
    finally {
      isLoading.value = false // 清除加载状态
      currentStream.value = null // 释放流引用
      abortController.value = null // 释放控制器
    }
  }

  /**
   * 中断流式请求
   */
  const cancel = () => {
    if (abortController.value) {
      abortController.value.abort() // 触发中断
    }
  }

  return {
    startStream, // 启动流方法
    cancel, // 中断流方法
    data, // 数据状态
    error, // 错误状态
    isLoading, // 加载状态
  }
}
