<script setup lang="ts">
import type { AISearchProps, SearchResult } from './types'
import { Delete, Loading, Search, Upload } from '@element-plus/icons-vue'
import { ElButton, ElIcon, ElInput, ElUpload } from 'element-plus'
import { computed, defineExpose, nextTick, ref, watch } from 'vue'
import BubbleList from '../BubbleList/index.vue'

const props = withDefaults(defineProps<AISearchProps>(), {
  placeholder: '输入关键词搜索或上传文件...',
  loading: false,
  disabled: false,
  clearable: true,
  results: () => [],
  maxHeight: '400px',
  displayMode: 'dropdown',
  allowFileUpload: true,
  acceptFileTypes: '.pdf,.doc,.docx,.txt,.md',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFileCount: 5,
  resultMaxWidth: '100%',
  inputWidth: '100%',
  autoFocus: false,
  debounceTime: 300,
  minSearchLength: 2,
})

const emits = defineEmits([
  'search',
  'clear',
  'resultClick',
  'fileUpload',
  'fileRemove',
  'update:results',
])

// 内部状态
const inputValue = ref('')
const isDropdownVisible = ref(false)
const selectedFiles = ref<File[]>([])
const inputRef = ref<HTMLElement | null>(null)
const bubbleListRef = ref<any>(null)
const debounceTimer = ref<number | null>(null)

// 计算属性
const hasResults = computed(() => props.results && props.results.length > 0)
const showDropdown = computed(() =>
  props.displayMode === 'dropdown'
  && isDropdownVisible.value
  && hasResults.value,
)
const showFlatResults = computed(() =>
  props.displayMode === 'flat'
  && hasResults.value,
)
const isSubmitDisabled = computed(() =>
  props.disabled
  || props.loading
  || (inputValue.value.trim().length < props.minSearchLength && selectedFiles.value.length === 0),
)

// 将搜索结果转换为气泡列表项
const bubbleListItems = computed(() => {
  return props.results.map(result => ({
    content: `<div class="search-result-item">
      <div class="search-result-title">${result.title}</div>
      <div class="search-result-content">${result.content}</div>
      ${result.source ? `<div class="search-result-source">${result.source}</div>` : ''}
    </div>`,
    placement: 'start' as const,
    isMarkdown: false,
    customProps: result.customProps,
    originalResult: result,
  }))
})

// 监听输入值变化
watch(inputValue, (newValue) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  if (newValue.trim().length >= props.minSearchLength) {
    debounceTimer.value = setTimeout(() => {
      handleSearch()
    }, props.debounceTime) as unknown as number
  }
  else if (newValue.trim().length === 0 && props.results.length > 0) {
    // 当输入框清空时，清空结果
    handleClear()
  }
})

// 处理搜索
function handleSearch() {
  if (isSubmitDisabled.value)
    return

  emits('search', {
    query: inputValue.value,
    files: selectedFiles.value,
  })

  // 显示下拉框
  isDropdownVisible.value = true
}

// 处理清空
function handleClear() {
  inputValue.value = ''
  selectedFiles.value = []
  isDropdownVisible.value = false
  emits('clear')
  emits('update:results', [])
}

// 处理文件上传
function handleFileUpload(file: File) {
  // 检查文件大小
  if (file.size > props.maxFileSize) {
    console.warn(`文件大小超过限制: ${file.name}`)
    return false
  }

  // 检查文件数量
  if (selectedFiles.value.length >= props.maxFileCount) {
    console.warn('文件数量超过限制')
    return false
  }

  // 添加文件
  selectedFiles.value.push(file)
  emits('fileUpload', file, selectedFiles.value)

  // 如果有文件，自动触发搜索
  if (selectedFiles.value.length > 0) {
    handleSearch()
  }

  return false // 阻止默认上传行为
}

// 处理文件移除
function handleFileRemove(file: File) {
  const index = selectedFiles.value.indexOf(file)
  if (index !== -1) {
    selectedFiles.value.splice(index, 1)
    emits('fileRemove', file, selectedFiles.value)
  }
}

// 处理结果点击
function handleResultClick(item: any, index: number) {
  emits('resultClick', item.originalResult, index)
}

// 处理点击外部关闭下拉框
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  const searchContainer = document.querySelector('.el-ai-search')

  if (searchContainer && !searchContainer.contains(target)) {
    isDropdownVisible.value = false
  }
}

// 暴露方法
function focus() {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
}

function clear() {
  handleClear()
}

function setLoading(_loading: boolean) {
  // 注意：props是只读的，这里应该通过emit来更新loading状态
  // 如果需要动态控制loading，建议使用v-model:loading
  console.warn('setLoading: props.loading is read-only, use v-model:loading instead')
}

function updateResults(results: SearchResult[]) {
  emits('update:results', results)
}

function scrollToTop() {
  if (bubbleListRef.value) {
    bubbleListRef.value.scrollToTop()
  }
}

function scrollToBottom() {
  if (bubbleListRef.value) {
    bubbleListRef.value.scrollToBottom()
  }
}

// 注册点击外部事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  if (props.autoFocus) {
    focus()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)

  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
})

// defineExpose({
//   focus,
//   clear,
//   setLoading,
//   updateResults,
//   scrollToTop,
//   scrollToBottom,
// })
</script>

<template>
  <div class="el-ai-search" :style="{ width: inputWidth }">
    <!-- 搜索输入区域 -->
    <div class="el-ai-search-input-container">
      <ElInput
        ref="inputRef"
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :loading="loading"
        :style="inputStyle"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <ElIcon><Search /></ElIcon>
        </template>

        <template #append>
          <div class="el-ai-search-actions">
            <!-- 文件上传按钮 -->
            <ElUpload
              v-if="allowFileUpload"
              :accept="acceptFileTypes"
              :show-file-list="false"
              :before-upload="handleFileUpload"
              class="el-ai-search-upload"
            >
              <ElButton :disabled="disabled">
                <ElIcon><Upload /></ElIcon>
              </ElButton>
            </ElUpload>

            <!-- 搜索按钮 -->
            <ElButton
              type="primary"
              :disabled="isSubmitDisabled"
              @click="handleSearch"
            >
              <ElIcon v-if="loading">
                <Loading />
              </ElIcon>
              <ElIcon v-else>
                <Search />
              </ElIcon>
            </ElButton>
          </div>
        </template>
      </ElInput>

      <!-- 已选文件展示 -->
      <div v-if="selectedFiles.length > 0" class="el-ai-search-files">
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="el-ai-search-file-item"
        >
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">({{ (file.size / 1024).toFixed(1) }}KB)</span>
          <ElButton
            type="text"
            class="file-remove"
            @click="handleFileRemove(file)"
          >
            <ElIcon><Delete /></ElIcon>
          </ElButton>
        </div>
      </div>
    </div>

    <!-- 下拉模式结果展示 -->
    <div
      v-if="showDropdown"
      class="el-ai-search-dropdown"
      :style="{ maxHeight, maxWidth: resultMaxWidth }"
    >
      <BubbleList
        ref="bubbleListRef"
        :list="bubbleListItems"
        :max-height="maxHeight"
        @complete="(instance, index) => handleResultClick(instance, index)"
      >
        <template #content="{ item }">
          <div
            class="el-ai-search-result-item"
            @click="handleResultClick(item, 0)"
          >
            <div v-html="item.content" />
          </div>
        </template>
      </BubbleList>
    </div>

    <!-- 平铺模式结果展示 -->
    <div v-if="showFlatResults" class="el-ai-search-flat-results">
      <h3 class="el-ai-search-results-title">
        搜索结果 ({{ props.results.length }})
      </h3>
      <BubbleList
        ref="bubbleListRef"
        :list="bubbleListItems"
        :max-height="maxHeight"
        @complete="(instance, index) => handleResultClick(instance, index)"
      >
        <template #content="{ item }">
          <div
            class="el-ai-search-result-item"
            @click="handleResultClick(item, 0)"
          >
            <div v-html="item.content" />
          </div>
        </template>
      </BubbleList>
    </div>
  </div>
</template>

<style scoped>
.el-ai-search {
  position: relative;
  width: 100%;
}

.el-ai-search-input-container {
  width: 100%;
}

.el-ai-search-actions {
  display: flex;
  align-items: center;
}

.el-ai-search-upload {
  margin-right: 8px;
}

.el-ai-search-files {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.el-ai-search-file-item {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
  font-size: 12px;
}

.file-name {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  margin-left: 4px;
  color: var(--el-text-color-secondary);
}

.file-remove {
  padding: 2px;
  margin-left: 4px;
}

/* 下拉模式样式 */
.el-ai-search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 2000;
  margin-top: 4px;
  overflow: auto;
}

/* 平铺模式样式 */
.el-ai-search-flat-results {
  margin-top: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;
}

.el-ai-search-results-title {
  padding: 12px 16px;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid var(--el-border-color);
  background-color: var(--el-fill-color-light);
}

.el-ai-search-result-item {
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 12px 16px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.el-ai-search-result-item:last-child {
  border-bottom: none;
}

.el-ai-search-result-item:hover {
  background-color: var(--el-fill-color-light);
}

.search-result-title {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--el-color-primary);
}

.search-result-content {
  font-size: 14px;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
  line-height: 1.5;
}

.search-result-source {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
</style>
