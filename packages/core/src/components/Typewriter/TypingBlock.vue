<script setup lang="ts">
import DOMPurify from 'dompurify';

const props = defineProps<{
  content: string;
  isMarkdown?: boolean;
  md?: any;
}>();

const md = inject('md');

const html = computed(() => {
  if (!props.isMarkdown) {
    return props.content;
  }

  return DOMPurify.sanitize(
    md.render(props.content)
  );
});
</script>

<template>
  <div
    class="typer-content markdown-body"
    v-html="html"
  />
</template>
