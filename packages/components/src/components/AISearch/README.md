# AISearch 组件

一个功能强大的AI检索组件，支持文本搜索和文件上传，并提供两种结果展示模式。

## 特性

- 支持文本搜索和文件上传
- 两种展示模式：下拉式和平铺式
- 可自定义外观和行为
- 支持防抖处理
- 支持文件类型和大小限制
- 响应式设计

## 基础用法

```vue
<script setup>
import AISearch from 'element-plus-x/components/AISearch';
import { ref } from 'vue';

const searchResults = ref([]);
const loading = ref(false);

function handleSearch(event) {
  const { query, files } = event;
  loading.value = true;
  // 执行搜索逻辑...
  // 更新 searchResults.value
  loading.value = false;
}

function handleResultClick(result, index) {
  // 处理结果点击
}
</script>

<template>
  <AISearch
    v-model:results="searchResults"
    :loading="loading"
    display-mode="dropdown"
    placeholder="输入关键词搜索或上传文件..."
    @search="handleSearch"
    @result-click="handleResultClick"
  />
</template>
```

## API

### Props

| 名称            | 类型                    | 默认值                        | 说明               |
| --------------- | ----------------------- | ----------------------------- | ------------------ |
| placeholder     | string                  | '输入关键词搜索或上传文件...' | 输入框占位文本     |
| loading         | boolean                 | false                         | 是否显示加载状态   |
| disabled        | boolean                 | false                         | 是否禁用           |
| clearable       | boolean                 | true                          | 是否可清空         |
| results         | SearchResult[]          | []                            | 搜索结果数组       |
| maxHeight       | string                  | '400px'                       | 结果区域最大高度   |
| displayMode     | 'dropdown' \| 'flat'    | 'dropdown'                    | 结果展示模式       |
| allowFileUpload | boolean                 | true                          | 是否允许文件上传   |
| acceptFileTypes | string                  | '.pdf,.doc,.docx,.txt,.md'    | 允许上传的文件类型 |
| maxFileSize     | number                  | 10485760 (10MB)               | 最大文件大小(字节) |
| maxFileCount    | number                  | 5                             | 最大文件数量       |
| resultMaxWidth  | string                  | '100%'                        | 结果区域最大宽度   |
| inputWidth      | string                  | '100%'                        | 输入框宽度         |
| inputStyle      | string \| CSSProperties | -                             | 输入框样式         |
| autoFocus       | boolean                 | false                         | 是否自动聚焦       |
| debounceTime    | number                  | 300                           | 搜索防抖时间(毫秒) |
| minSearchLength | number                  | 2                             | 最小搜索字符数     |

### Events

| 名称           | 参数                                  | 说明               |
| -------------- | ------------------------------------- | ------------------ |
| search         | { query: string, files: File[] }      | 触发搜索时触发     |
| clear          | -                                     | 清空搜索时触发     |
| result-click   | (result: SearchResult, index: number) | 点击结果项时触发   |
| file-upload    | (file: File, files: File[])           | 上传文件时触发     |
| file-remove    | (file: File, files: File[])           | 移除文件时触发     |
| update:results | SearchResult[]                        | 更新结果数组时触发 |

### Methods

| 名称           | 参数                      | 返回值 | 说明           |
| -------------- | ------------------------- | ------ | -------------- |
| focus          | -                         | -      | 聚焦输入框     |
| clear          | -                         | -      | 清空输入和结果 |
| setLoading     | (loading: boolean)        | -      | 设置加载状态   |
| updateResults  | (results: SearchResult[]) | -      | 更新搜索结果   |
| scrollToTop    | -                         | -      | 滚动到结果顶部 |
| scrollToBottom | -                         | -      | 滚动到结果底部 |

### 类型定义

```typescript
interface SearchResult {
  id: string;
  title: string;
  content: string;
  source?: string;
  timestamp?: Date;
  fileType?: string;
  fileSize?: number;
  filePath?: string;
  relevanceScore?: number;
  customProps?: Record<string, any>;
}
```
