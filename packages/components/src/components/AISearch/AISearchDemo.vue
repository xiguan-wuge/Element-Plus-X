<script setup lang="ts">
import type { SearchResult } from './types';
import { ref } from 'vue';
import AISearch from './index.vue';

const searchResults = ref<SearchResult[]>([]);
const loading = ref(false);
const displayMode = ref<'dropdown' | 'flat'>('dropdown');

// 模拟搜索处理函数
async function handleSearch(event: { query: string; files: File[] }) {
  loading.value = true;

  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 生成模拟结果
    const results: SearchResult[] = [];

    // 基于查询生成结果
    if (event.query) {
      for (let i = 1; i <= 5; i++) {
        results.push({
          id: `query-${i}`,
          title: `搜索结果 ${i} - ${event.query}`,
          content: `这是关于 "${event.query}" 的搜索结果内容。这里包含了一些相关的信息和描述，可能对您的查询有所帮助。`,
          source: '网络搜索',
          timestamp: new Date(),
          relevanceScore: 0.95 - (i * 0.05)
        });
      }
    }

    // 基于文件生成结果
    for (const file of event.files) {
      results.push({
        id: `file-${file.name}`,
        title: `文件分析: ${file.name}`,
        content: `我们分析了您上传的文件 "${file.name}"，发现了以下内容和见解...`,
        source: '文件分析',
        timestamp: new Date(),
        fileType: file.type,
        fileSize: file.size,
        filePath: file.name,
        relevanceScore: 0.98
      });
    }

    searchResults.value = results;
  }
  finally {
    loading.value = false;
  }
}

function handleResultClick(result: SearchResult, index: number) {
  console.log('点击了结果:', result, '索引:', index);
  // 这里可以处理结果点击事件，例如导航到详情页或显示更多信息
}

// function toggleDisplayMode() {
//   displayMode.value = displayMode.value === 'dropdown' ? 'flat' : 'dropdown'
// }
</script>

<template>
  <div class="ai-search-demo">
    <h2>AI 检索组件示例</h2>

    <div class="display-mode-toggle">
      <span>展示模式:</span>
      <el-radio-group v-model="displayMode">
        <el-radio-button label="dropdown">
          下拉模式
        </el-radio-button>
        <el-radio-button label="flat">
          平铺模式
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="search-container">
      <AISearch
        v-model:results="searchResults"
        :loading="loading"
        :display-mode="displayMode"
        placeholder="输入关键词搜索或上传文件..."
        max-height="300px"
        @search="handleSearch"
        @result-click="handleResultClick"
      />
    </div>
  </div>
</template>

<style scoped>
.ai-search-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.display-mode-toggle {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-container {
  width: 100%;
}
</style>
