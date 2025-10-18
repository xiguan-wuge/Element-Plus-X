<script setup lang="ts">
import type { BubbleListItemProps } from '../BubbleList/types'
import type { ChatDialogProps, ChatMessage } from './types'
import BubbleList from '../BubbleList/index.vue'
import Sender from '../Sender/index.vue'

const props = withDefaults(defineProps<ChatDialogProps>(), {
  messages: () => [],
  maxHeight: '500px',
  placeholder: '请输入消息...',
  loading: false,
  disabled: false,
  clearable: true,
  allowSpeech: true,
  autoScroll: true,
  showAvatar: true,
  userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  aiAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  userAvatarSize: 32,
  aiAvatarSize: 32,
  bubbleMaxWidth: '80%',
  typingSpeed: 50,
  showTypingEffect: true,
})

const emits = defineEmits<{
  'send': [message: string]
  'clear': []
  'update:messages': [messages: ChatMessage[]]
  'messageComplete': [instance: any, index: number]
  'copyMessage': [message: ChatMessage]
  'deleteMessage': [message: ChatMessage]
}>()

const bubbleListRef = ref()
const senderRef = ref()
const inputValue = ref('')

// 转换消息格式为BubbleList格式
const bubbleList = computed(() => {
  return props.messages.map((message, index) => {
    const isUser = message.role === 'user'
    const bubbleItem = {
      key: index,
      content: message.content,
      placement: isUser ? 'end' : 'start',
      loading: message.loading || false,
      typing: isUser ? false : (props.showTypingEffect ? {
        step: props.typingSpeed,
        suffix: '...'
      } : false),
      isMarkdown: message.isMarkdown || false,
      isFog: message.isFog || false,
      avatar: isUser ? props.userAvatar : props.aiAvatar,
      avatarSize: isUser ? props.userAvatarSize.toString() : props.aiAvatarSize.toString(),
      maxWidth: props.bubbleMaxWidth,
      role: message.role,
      timestamp: message.timestamp,
      id: message.id,
      ...message.customProps
    }
    return bubbleItem as BubbleListItemProps & ChatMessage
  })
})

// 发送消息
const handleSend = (value: string) => {
  if (!value.trim()) return
  
  const userMessage: ChatMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: value.trim(),
    timestamp: new Date(),
  }
  
  const newMessages = [...props.messages, userMessage]
  emits('update:messages', newMessages)
  emits('send', value.trim())
  
  inputValue.value = ''
  
  // 自动滚动到底部
  if (props.autoScroll) {
    nextTick(() => {
      bubbleListRef.value?.scrollToBottom()
    })
  }
}

// 清空消息
const handleClear = () => {
  emits('clear')
  emits('update:messages', [])
}

// 添加AI回复
const addAIResponse = (content: string, options?: Partial<ChatMessage>) => {
  const aiMessage: ChatMessage = {
    id: Date.now().toString(),
    role: 'ai',
    content,
    timestamp: new Date(),
    isMarkdown: true,
    ...options
  }
  
  const newMessages = [...props.messages, aiMessage]
  emits('update:messages', newMessages)
  
  // 自动滚动到底部
  if (props.autoScroll) {
    nextTick(() => {
      bubbleListRef.value?.scrollToBottom()
    })
  }
}

// 设置消息加载状态
const setMessageLoading = (messageId: string, loading: boolean) => {
  const newMessages = props.messages.map(msg => 
    msg.id === messageId ? { ...msg, loading } : msg
  )
  emits('update:messages', newMessages)
}

// 更新消息内容
const updateMessage = (messageId: string, content: string) => {
  const newMessages = props.messages.map(msg => 
    msg.id === messageId ? { ...msg, content } : msg
  )
  emits('update:messages', newMessages)
}

// 暴露方法给父组件
defineExpose({
  addAIResponse,
  setMessageLoading,
  updateMessage,
  scrollToTop: () => bubbleListRef.value?.scrollToTop(),
  scrollToBottom: () => bubbleListRef.value?.scrollToBottom(),
  scrollToMessage: (index: number) => bubbleListRef.value?.scrollToBubble(index),
  clear: handleClear,
  focus: () => senderRef.value?.focus(),
})
</script>

<template>
  <div class="el-chat-dialog">
    <!-- 消息列表区域 -->
    <div class="el-chat-dialog__messages">
      <BubbleList
        ref="bubbleListRef"
        :list="bubbleList"
        :max-height="maxHeight"
        :always-show-scrollbar="true"
        @complete="(instance, index) => emits('messageComplete', instance, index)"
      >
        <template #avatar="{ item }">
          <el-avatar 
            v-if="showAvatar"
            :size="item.avatarSize" 
            :src="item.avatar"
            :shape="item.avatarShape || 'circle'"
          />
        </template>

        <template #header="{ item }">
          <slot name="message-header" :item="item">
            <div class="message-header">
              <span class="message-role">{{ item.role === 'user' ? '用户' : 'AI助手' }}</span>
              <span v-if="item.timestamp" class="message-time">
                {{ new Date(item.timestamp).toLocaleTimeString() }}
              </span>
            </div>
          </slot>
        </template>

        <template #content="{ item }">
          <slot name="message-content" :item="item">
            <div class="message-content">
              {{ item.content }}
            </div>
          </slot>
        </template>

        <template #footer="{ item }">
          <slot name="message-footer" :item="item">
            <div class="message-footer">
              <el-button 
                v-if="item.role === 'ai'"
                type="text" 
                size="small"
                @click="emits('copyMessage', item)"
              >
                复制
              </el-button>
              <el-button 
                type="text" 
                size="small"
                @click="emits('deleteMessage', item)"
              >
                删除
              </el-button>
            </div>
          </slot>
        </template>

        <template #loading="{ item }">
          <slot name="message-loading" :item="item">
            <div class="message-loading">
              <el-icon class="is-loading"><Loading /></el-icon>
              <span>AI正在思考中...</span>
            </div>
          </slot>
        </template>
      </BubbleList>
    </div>

    <!-- 输入区域 -->
    <div class="el-chat-dialog__input">
      <Sender
        ref="senderRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :loading="loading"
        :disabled="disabled"
        :clearable="clearable"
        :allow-speech="allowSpeech"
        :submit-type="'enter'"
        :auto-size="{ minRows: 1, maxRows: 4 }"
        @submit="handleSend"
        @clear="handleClear"
      >
        <template #header>
          <slot name="input-header" />
        </template>

        <template #prefix>
          <slot name="input-prefix" />
        </template>

        <template #action-list>
          <slot name="input-actions">
            <div class="input-actions">
              <el-button 
                v-if="messages.length > 0"
                type="text" 
                size="small"
                @click="handleClear"
              >
                清空对话
              </el-button>
            </div>
          </slot>
        </template>
      </Sender>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-chat-dialog {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--el-bg-color);
  border-radius: var(--el-border-radius-base);
  border: 1px solid var(--el-border-color-light);
  overflow: hidden;

  &__messages {
    flex: 1;
    overflow: hidden;
    padding: 16px;
    background-color: var(--el-bg-color-page);
  }

  &__input {
    padding: 16px;
    border-top: 1px solid var(--el-border-color-light);
    background-color: var(--el-bg-color);
  }
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  color: var(--el-text-color-secondary);

  .message-role {
    font-weight: 500;
  }

  .message-time {
    opacity: 0.8;
  }
}

.message-content {
  word-break: break-word;
  line-height: 1.5;
}

.message-footer {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  .el-bubble:hover & {
    opacity: 1;
  }
}

.message-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  .el-icon {
    font-size: 16px;
  }
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style> 