<!-- <docs>
---
title: 基础使用
---

预设样式的气泡列表，通过一个消息简单的 `Array` ，可以快速创建一个聊天记录。

我们所有的消息操作，只需要维护这个数组就行了，包括 **`流式消息`** 的设置。这里没有使用接口流式操作。在下面有

你还可以通过属性 `max-height` 来控制列表的最大高度。
</docs> -->

<script setup lang="ts">
import type { BubbleListItemProps, BubbleListProps } from 'vue-element-plus-x/types/BubbleList'
import { ref } from 'vue'

type listType = BubbleListItemProps & {
  key: number
  role: 'user' | 'ai'
}

// 示例调用
const list: BubbleListProps<listType>['list'] = ref(generateFakeItems(5))

function generateFakeItems(count: number): listType[] {
  const messages: listType[] = []
  messages.push({
    key: 0,
    isPompts: true,
    promptItems: [
      {
        key: '1',
        label: '🐛 提示集组件标题',
        description: '描述信息'.repeat(3),
      },
      {
        key: '2',
        label: '🐛 提示集组件标题',
      },
      {
        key: '3',
        label: '🐛 提示集组件标题',
      },
      {
        key: '4',
        label: '🐛 提示集组件标题',
      },
    ],
  })
  for (let i = 1; i < count; i++) {
    const role = i % 2 === 0 ? 'ai' : 'user'
    const placement = role === 'ai' ? 'start' : 'end'
    const key = i + 1
    const content = role === 'ai'
      ? '💖 感谢使用 Element Plus X ! 你的支持，是我们开源的最强动力 ~'.repeat(5)
      : `哈哈哈，让我试试,哈哈哈，让我试试,哈哈哈，让我试试,哈哈哈，让我试试,哈哈哈，让我试试,哈哈哈，让我试试,`
    const loading = false
    const shape = 'corner'
    const variant = role === 'ai' ? 'filled' : 'outlined'
    const isMarkdown = role === 'ai'
    const typing = role === 'ai' ? i === count - 1 : false
    const avatar = role === 'ai'
      ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      : 'https://avatars.githubusercontent.com/u/76239030?v=4'

    messages.push({
      key, // 唯一标识
      role, // user | ai 自行更据模型定义
      placement, // start | end 气泡位置
      content, // 消息内容 流式接受的时候，只需要改这个值即可
      loading, // 当前气泡的加载状态
      shape, // 气泡的形状
      variant, // 气泡的样式
      isMarkdown, // 是否渲染为 markdown
      typing, // 是否开启打字器效果 该属性不会和流式接受冲突
      isFog: role === 'ai', // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
      avatar,
      avatarSize: '24px', // 头像占位大小
      avatarGap: '12px', // 头像与气泡之间的距离
    })
  }
  return messages
}
function addData() {
  list.value.push({
    key: list.value.length + 1, // 唯一标识
    role: 'ai', // user | ai 自行更据模型定义
    placement: 'start', // start | end 气泡位置
    content: '消息内容 流式接受的时候，只需要改这个值即可 \n # 这是一级标题', // 消息内容 流式接受的时候，只需要改这个值即可
    loading: false, // 当前气泡的加载状态
    shape: 'corner', // 气泡的形状
    variant: 'filled', // 气泡的样式
    isMarkdown: true, // 是否渲染为 markdown
    typing: true, // 是否开启打字器效果 该属性不会和流式接受冲突
    isFog: true, // 是否开启打字雾化效果，该效果 v1.1.6 新增，且在 typing 为 true 时生效，该效果会覆盖 typing 的 suffix 属性
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    avatarSize: '24px', // 头像占位大小
    avatarGap: '12px', // 头像与气泡之间的距离
  })
  console.log('list', list.value)
}
function addPrompts() {
  list.value.push({
    key: list.value.length + 1,
    isPompts: true,
    promptItems: [
      {
        key: '1',
        label: '🐛 提示集组件标题',
        description: '描述信息'.repeat(3),
      },
      {
        key: '2',
        label: '🐛 提示集组件标题',
      },
      {
        key: '3',
        label: '🐛 提示集组件标题',
      },
      {
        key: '4',
        label: '🐛 提示集组件标题',
      },
    ],
  })
  console.log('list', list.value)
}
</script>

<template>
  <BubbleList :list="list" max-height="350px" />
  <hr>
  <el-button @click="addData">
    添加数据
  </el-button>
  <el-button @click="addPrompts">
    添加Prompts数据
  </el-button>
</template>
