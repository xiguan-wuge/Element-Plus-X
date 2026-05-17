<script setup lang="ts">
import type { ChatMessage } from 'vue-element-plus-x/types/ChatDialog';

const chatDialogRef = ref();
const messages = ref<ChatMessage[]>([
  {
    id: '1',
    role: 'ai',
    content: '你好！我是AI助手，有什么可以帮助你的吗？',
    timestamp: new Date(Date.now() - 60000),
    isMarkdown: true,
  },
  {
    id: '2',
    role: 'user',
    content: '请介绍一下Vue3的新特性',
    timestamp: new Date(Date.now() - 30000),
  },
  {
    id: '3',
    role: 'ai',
    content: `Vue3带来了许多激动人心的新特性：

## 🚀 主要特性

### 1. Composition API
- 更好的逻辑复用
- 更灵活的组件组织
- 更好的TypeScript支持

### 2. 性能提升
- 更小的包体积
- 更快的渲染速度
- 更好的Tree-shaking

### 3. 新组件
- Teleport
- Suspense
- Fragment

### 4. 响应式系统
- Proxy-based reactivity
- 更精确的依赖追踪
- 更好的性能

这些特性让Vue3成为了一个更强大、更灵活的框架！`,
    timestamp: new Date(),
    isMarkdown: true,
  },
]);

const loading = ref(false);

// 处理发送消息
async function handleSend(message: string) {
  console.log('发送消息:', message);

  // 模拟AI回复
  loading.value = true;

  setTimeout(() => {
    const aiResponse = `收到你的消息："${message}"。这是一个模拟的AI回复，在实际使用中，你可以连接到真实的AI服务。`;

    chatDialogRef.value?.addAIResponse(aiResponse, {
      isMarkdown: true,
      isFog: true,
    });

    loading.value = false;
  }, 2000);
}

// 处理清空对话
function handleClear() {
  ElMessage.success('对话已清空');
}

// 处理复制消息
function handleCopyMessage(message: ChatMessage) {
  navigator.clipboard.writeText(message.content);
  ElMessage.success('消息已复制到剪贴板');
}

// 处理删除消息
function handleDeleteMessage(message: ChatMessage) {
  const newMessages = messages.value.filter(msg => msg.id !== message.id);
  messages.value = newMessages;
  ElMessage.success('消息已删除');
}

// 处理消息完成
function handleMessageComplete(instance: any, index: number) {
  console.log('消息打字完成:', index);
}

// 添加测试消息
function addTestMessage() {
  const testMessage: ChatMessage = {
    id: Date.now().toString(),
    role: 'user',
    content: '这是一条测试消息',
    timestamp: new Date(),
  };
  messages.value.push(testMessage);
}

// 模拟流式回复
function simulateStreamResponse() {
  const messageId = Date.now().toString();
  const aiMessage: ChatMessage = {
    id: messageId,
    role: 'ai',
    content: '',
    timestamp: new Date(),
    loading: true,
    isMarkdown: true,
  };

  messages.value.push(aiMessage);

  let content = '';
  const fullContent = '这是一个模拟的流式回复，文字会逐步显示出来...';
  const interval = setInterval(() => {
    if (content.length < fullContent.length) {
      content += fullContent[content.length];
      chatDialogRef.value?.updateMessage(messageId, content);
    }
    else {
      chatDialogRef.value?.setMessageLoading(messageId, false);
      clearInterval(interval);
    }
  }, 100);
}
</script>

<template>
  <div class="component-container">
    <div class="header-wrap">
      <h3>ChatDialog 对话框组件</h3>
      <p>基于BubbleList和Sender组件封装的完整对话框组件，支持输入、AI回答和对话历史展示</p>
    </div>

    <div class="controls">
      <el-button type="primary" @click="addTestMessage">
        添加测试消息
      </el-button>
      <el-button type="success" @click="simulateStreamResponse">
        模拟流式回复
      </el-button>
      <el-button type="warning" @click="chatDialogRef?.scrollToTop()">
        滚动到顶部
      </el-button>
      <el-button type="info" @click="chatDialogRef?.scrollToBottom()">
        滚动到底部
      </el-button>
    </div>

    <div class="chat-container">
      <ChatDialog
        ref="chatDialogRef"
        v-model:messages="messages"
        :loading="loading"
        max-height="400px"
        placeholder="请输入你的问题..."
        :show-avatar="true"
        user-avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ai-avatar="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        :typing-speed="30"
        :show-typing-effect="true"
        @send="handleSend"
        @clear="handleClear"
        @copy-message="handleCopyMessage"
        @delete-message="handleDeleteMessage"
        @message-complete="handleMessageComplete"
      >
        <!-- 自定义消息头部 -->
        <template #message-header="{ item }">
          <div class="custom-message-header">
            <span class="role-badge" :class="item.role">
              {{ item.role === 'user' ? '👤 用户' : '🤖 AI助手' }}
            </span>
            <span class="time">{{ new Date(item.timestamp).toLocaleTimeString() }}</span>
          </div>
        </template>

        <!-- 自定义输入框头部 -->
        <template #input-header>
          <div class="input-header">
            <el-alert
              title="💡 提示"
              type="info"
              :closable="false"
              show-icon
            >
              支持语音输入、Markdown渲染、打字效果等功能
            </el-alert>
          </div>
        </template>
      </ChatDialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component-container {
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-wrap {
  text-align: center;

  h3 {
    margin: 0 0 8px 0;
    color: var(--el-color-primary);
  }

  p {
    margin: 0;
    color: var(--el-text-color-secondary);
    font-size: 14px;
  }
}

.controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chat-container {
  flex: 1;
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  overflow: hidden;
}

.custom-message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;

  .role-badge {
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;

    &.user {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }

    &.ai {
      background-color: var(--el-color-success-light-9);
      color: var(--el-color-success);
    }
  }

  .time {
    opacity: 0.7;
  }
}

.input-header {
  margin-bottom: 8px;
}
</style>
