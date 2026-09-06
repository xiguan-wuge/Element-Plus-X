<script setup lang="ts">
import type { SkillType } from '../types.d';
import { Close } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { h } from 'vue';

const props = defineProps<{
  skill: SkillType;
}>();

const emit = defineEmits<{
  remove: [e: MouseEvent];
}>();

const closeConfig = computed(() => {
  if (!props.skill.closable) return null;
  return typeof props.skill.closable === 'boolean' ? {} : props.skill.closable;
});

function handleClose(e: MouseEvent) {
  const config = closeConfig.value;
  if (config?.disabled) return;
  e.stopPropagation();
  emit('remove', e);
  config?.onClose?.(e);
}

/** 标题渲染（支持 string / VNode） */
function TitleRender() {
  const title = props.skill.title || props.skill.value;
  return title;
}

/** 关闭图标渲染（支持自定义 VNode） */
function CloseIconRender() {
  const icon = closeConfig.value?.closeIcon;
  return icon || h(ElIcon, null, { default: () => h(Close) });
}
</script>

<template>
  <div class="el-sender-skill-wrapper" contenteditable="false">
    <el-tooltip
      v-if="skill.toolTip"
      :content="skill.toolTip"
      placement="top"
      :show-after="100"
    >
      <div
        class="el-sender-skill-tag"
        contenteditable="false"
        role="button"
        tabindex="0"
      >
        <span class="el-sender-skill-tag-text">
          <component :is="TitleRender" />
        </span>
        <div
          v-if="closeConfig"
          class="el-sender-skill-close"
          :class="{ 'el-sender-skill-close-disabled': closeConfig.disabled }"
          role="button"
          aria-label="Close skill"
          tabindex="0"
          @click="handleClose"
        >
          <component :is="CloseIconRender" />
        </div>
      </div>
    </el-tooltip>
    <div
      v-else
      class="el-sender-skill-tag"
      contenteditable="false"
      role="button"
      tabindex="0"
    >
      <span class="el-sender-skill-tag-text">
        <component :is="TitleRender" />
      </span>
      <div
        v-if="closeConfig"
        class="el-sender-skill-close"
        :class="{ 'el-sender-skill-close-disabled': closeConfig.disabled }"
        role="button"
        aria-label="Close skill"
        tabindex="0"
        @click="handleClose"
      >
        <component :is="CloseIconRender" />
      </div>
    </div>
    <!-- 占位容器：空态时由父级把光标定位到此区域 -->
    <div class="el-sender-skill-holder" />
  </div>
</template>

<style scoped>
.el-sender-skill-close {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.el-sender-skill-close-disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
</style>
