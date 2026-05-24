<script setup lang="ts">
import type {
  TypewriterEmits,
  TypewriterInstance,
  TypewriterProps,
  TypingConfig
} from './types.d.ts';

import DOMPurify from 'dompurify';
import { useConfigProvider } from '../ConfigProvider/hooks.ts';
import StableBlocks from './StableBlocks.vue';
import TypingBlock from './TypingBlock.vue';

interface BlockItem {
  id: number;
  raw: string;
  html: string;
}

const props = withDefaults(defineProps<TypewriterProps>(), {
  content: '',
  isMarkdown: false,
  typing: false,
  isFog: false
});

const emits = defineEmits<TypewriterEmits>();

const configProvider = useConfigProvider();

const md = computed(() => configProvider.value.md);

const typingIndex = ref(0);

const isTyping = ref(false);

const stableBlocks = ref<BlockItem[]>([]);

const typingBlock = ref('');

const contentCache = ref('');

const renderCache = new Map<string, string>();

let timer: ReturnType<typeof setTimeout> | null = null;

/**
 * markdown plugin 防止重复注册
 */
const installedPlugins = new WeakSet();

function initMarkdownPlugins() {
  const plugins = [
    ...(configProvider.value.mdPlugins || []),
    ...(props.mdPlugins || [])
  ];

  plugins.forEach((plugin) => {
    if (!installedPlugins.has(plugin)) {
      md.value?.use(plugin);
      installedPlugins.add(plugin);
    }
  });
}

initMarkdownPlugins();

/**
 * typing config
 */
const mergedConfig: ComputedRef<TypingConfig> = computed(() => {
  const defaultConfig: TypingConfig = {
    step: typeof props.typing === 'object'
      ? (props.typing.step ?? 2)
      : 2,

    interval: typeof props.typing === 'object'
      ? (props.typing.interval ?? 50)
      : 50,

    suffix: props.isMarkdown
      ? ''
      : typeof props.typing === 'object'
        ? (props.typing.suffix ?? '|')
        : '|'
  };

  if (props.typing === true) {
    return defaultConfig;
  }

  if (typeof props.typing === 'object') {
    return {
      ...defaultConfig,
      ...props.typing,
      suffix: props.isMarkdown
        ? ''
        : (props.typing.suffix ?? '|')
    };
  }

  return defaultConfig;
});

/**
 * markdown render cache
 */
function renderMarkdown(raw: string) {
  if (!props.isMarkdown) {
    return raw;
  }

  if (renderCache.has(raw)) {
    return renderCache.get(raw)!;
  }

  const html = md.value?.render(raw) ?? '';

  const sanitized = typeof window === 'undefined'
    ? html
    : DOMPurify.sanitize(html);

  renderCache.set(raw, sanitized);

  return sanitized;
}

/**
 * block splitter
 *
 * 后续可升级：
 * - code block parser
 * - table parser
 * - markdown AST
 */
function splitBlocks(content: string) {
  return content.split(/\n{2,}/);
}

/**
 * append-only block update
 *
 * 核心优化：
 * 已完成 block 永不更新
 */
function updateBlocks(text: string) {
  const blocks = splitBlocks(text);

  const stable = blocks.slice(0, -1);

  const current = blocks.at(-1) ?? '';

  /**
   * append-only
   *
   * 不再整体替换 stableBlocks
   */
  for (let i = stableBlocks.value.length; i < stable.length; i++) {
    const raw = stable[i];

    stableBlocks.value.push({
      id: i,
      raw,
      html: renderMarkdown(raw)
    });
  }

  typingBlock.value = current;
}

/**
 * typing progress
 */
const typingProgress = computed(() => {
  return contentCache.value
    ? Math.min(
        (typingIndex.value / contentCache.value.length) * 100,
        100
      )
    : 0;
});

/**
 * typing logic
 */
watch(
  () => props.content,
  (newVal, oldVal) => {
    if (!props.typing) {
      contentCache.value = newVal || '';

      typingIndex.value = contentCache.value.length;

      updateBlocks(contentCache.value);

      isTyping.value = false;

      return;
    }

    const shouldReset =
      !oldVal ||
      !newVal?.startsWith(oldVal);

    if (shouldReset) {
      stableBlocks.value = [];

      typingBlock.value = '';

      typingIndex.value = 0;
    }

    contentCache.value = newVal || '';

    if (!isTyping.value) {
      startTyping();
    }
  },
  {
    immediate: true
  }
);

function startTyping() {
  clearTimeout(timer!);

  if (!props.typing || !contentCache.value) {
    return;
  }

  isTyping.value = true;

  emits('start', instance);

  const typeNext = () => {
    typingIndex.value += mergedConfig.value.step!;

    const currentText = contentCache.value.slice(
      0,
      typingIndex.value
    );

    updateBlocks(currentText);

    emits('writing', instance);

    if (typingIndex.value >= contentCache.value.length) {
      finishTyping();

      return;
    }

    timer = setTimeout(
      typeNext,
      mergedConfig.value.interval
    );
  };

  timer = setTimeout(
    typeNext,
    mergedConfig.value.interval
  );
}

function finishTyping() {
  isTyping.value = false;

  typingIndex.value = contentCache.value.length;

  if ((props.typing as TypingConfig)?.isRequestEnd ?? true) {
    emits('finish', instance);
  }
}

function interrupt() {
  clearTimeout(timer!);

  isTyping.value = false;
}

function continueTyping() {
  if (typingIndex.value < contentCache.value.length) {
    startTyping();
  }
}

function restart() {
  stableBlocks.value = [];

  typingBlock.value = '';

  typingIndex.value = 0;

  startTyping();
}

function destroy() {
  clearTimeout(timer!);

  timer = null;

  stableBlocks.value = [];

  typingBlock.value = '';

  typingIndex.value = 0;

  isTyping.value = false;
}

const instance: TypewriterInstance = {
  interrupt,
  continue: continueTyping,
  restart,
  destroy,
  isTyping: toRef(isTyping),
  progress: computed(() => typingProgress.value),

  renderedContent: computed(() => {
    return [
      ...stableBlocks.value.map(item => item.raw),
      typingBlock.value
    ].join('\n\n');
  })
};

onUnmounted(destroy);

defineExpose(instance);
</script>

<template>
  <div class="typer-container">
    <StableBlocks
      :blocks="stableBlocks"
    />

    <TypingBlock
      :content="typingBlock"
      :typing="typing"
      :is-markdown="isMarkdown"
      :md="md"
    />
  </div>
</template>

<style scoped lang="scss" src="./style.scss"></style>
