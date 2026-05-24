<script setup lang="ts">
defineProps<{
  blocks: {
    id: number;
    html: string;
  }[];
}>();
</script>

<template>
  <div
    v-for="block in blocks"
    v-once
    :key="block.id"
    class="typer-content markdown-body"
    v-html="block.html"
  />
</template>
