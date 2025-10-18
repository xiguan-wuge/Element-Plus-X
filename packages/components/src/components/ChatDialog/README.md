# ChatDialog 对话框组件 💬

## 介绍

`ChatDialog` 是一个基于 Element-Plus-X 组件库封装的完整对话框组件，结合了 `BubbleList` 和 `Sender` 组件的功能，提供了完整的聊天对话体验。

## 主要特性

- ✅ **输入和AI回答** - 支持用户输入和AI回复
- ✅ **对话历史展示** - 完整的对话记录展示
- ✅ **打字效果** - AI回复支持打字动画效果
- ✅ **语音输入** - 支持语音识别输入
- ✅ **Markdown渲染** - 支持Markdown格式内容
- ✅ **自动滚动** - 新消息自动滚动到底部
- ✅ **消息操作** - 支持复制、删除消息
- ✅ **自定义头像** - 可自定义用户和AI头像
- ✅ **多种插槽** - 丰富的自定义插槽支持

## 基础用法

```vue
<script setup lang="ts">
import type { ChatMessage } from 'vue-element-plus-x/types/ChatDialog'

const messages = ref<ChatMessage[]>([
  {
    id: '1',
    role: 'ai',
    content: '你好！我是AI助手，有什么可以帮助你的吗？',
    timestamp: new Date(),
    isMarkdown: true,
  }
])

const loading = ref(false)

async function handleSend(message: string) {
  // 处理发送消息
  loading.value = true

  // 模拟AI回复
  setTimeout(() => {
    const aiResponse = `收到你的消息："${message}"`
    chatDialogRef.value?.addAIResponse(aiResponse, {
      isMarkdown: true,
    })
    loading.value = false
  }, 1000)
}

function handleClear() {
  // 处理清空对话
  ElMessage.success('对话已清空')
}
</script>

<template>
  <ChatDialog
    v-model:messages="messages"
    :loading="loading"
    @send="handleSend"
    @clear="handleClear"
  />
</template>
```

## 流式回复示例

```vue
<script setup lang="ts">
const chatDialogRef = ref()

function handleStreamResponse(message: string) {
  const messageId = Date.now().toString()

  // 添加空的AI消息
  const aiMessage: ChatMessage = {
    id: messageId,
    role: 'ai',
    content: '',
    timestamp: new Date(),
    loading: true,
    isMarkdown: true,
  }

  messages.value.push(aiMessage)

  // 模拟流式回复
  let content = ''
  const fullContent = '这是一个流式回复示例，文字会逐步显示...'

  const interval = setInterval(() => {
    if (content.length < fullContent.length) {
      content += fullContent[content.length]
      chatDialogRef.value?.updateMessage(messageId, content)
    }
    else {
      chatDialogRef.value?.setMessageLoading(messageId, false)
      clearInterval(interval)
    }
  }, 100)
}
</script>

<template>
  <ChatDialog
    ref="chatDialogRef"
    v-model:messages="messages"
    @send="handleStreamResponse"
  />
</template>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `messages` | `ChatMessage[]` | `[]` | 对话消息列表 |
| `maxHeight` | `string` | `'500px'` | 消息列表最大高度 |
| `placeholder` | `string` | `'请输入消息...'` | 输入框占位符 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `disabled` | `boolean` | `false` | 是否禁用输入 |
| `clearable` | `boolean` | `true` | 是否显示清空按钮 |
| `allowSpeech` | `boolean` | `true` | 是否允许语音输入 |
| `autoScroll` | `boolean` | `true` | 是否自动滚动到底部 |
| `showAvatar` | `boolean` | `true` | 是否显示头像 |
| `userAvatar` | `string` | - | 用户头像URL |
| `aiAvatar` | `string` | - | AI头像URL |
| `userAvatarSize` | `number` | `32` | 用户头像大小 |
| `aiAvatarSize` | `number` | `32` | AI头像大小 |
| `bubbleMaxWidth` | `string` | `'80%'` | 气泡最大宽度 |
| `typingSpeed` | `number` | `50` | 打字速度 |
| `showTypingEffect` | `boolean` | `true` | 是否显示打字效果 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `send` | `(message: string)` | 发送消息时触发 |
| `clear` | - | 清空对话时触发 |
| `update:messages` | `(messages: ChatMessage[])` | 消息列表更新时触发 |
| `copyMessage` | `(message: ChatMessage)` | 复制消息时触发 |
| `deleteMessage` | `(message: ChatMessage)` | 删除消息时触发 |
| `messageComplete` | `(instance, index)` | 消息打字完成时触发 |

### Methods

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `addAIResponse` | `(content: string, options?: Partial<ChatMessage>)` | 添加AI回复 |
| `setMessageLoading` | `(messageId: string, loading: boolean)` | 设置消息加载状态 |
| `updateMessage` | `(messageId: string, content: string)` | 更新消息内容 |
| `scrollToTop` | - | 滚动到顶部 |
| `scrollToBottom` | - | 滚动到底部 |
| `scrollToMessage` | `(index: number)` | 滚动到指定消息 |
| `clear` | - | 清空对话 |
| `focus` | - | 聚焦输入框 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `message-header` | `{ item }` | 自定义消息头部 |
| `message-content` | `{ item }` | 自定义消息内容 |
| `message-footer` | `{ item }` | 自定义消息底部 |
| `message-loading` | `{ item }` | 自定义加载状态 |
| `input-header` | - | 自定义输入框头部 |
| `input-prefix` | - | 自定义输入框前缀 |
| `input-actions` | - | 自定义输入框操作按钮 |

## 类型定义

```typescript
interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
  loading?: boolean
  isMarkdown?: boolean
  isFog?: boolean
  customProps?: Record<string, any>
}
```

## 完整示例

查看 [ChatDialogDemo.vue](../../../../apps/playground/src/components/ChatDialogDemo.vue) 获取完整的使用示例。
