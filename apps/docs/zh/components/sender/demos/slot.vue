<docs>
---
title: 词槽模式
---

::: warning
新增能力：传入 `slotConfig`（词槽配置）或 `skill`（@技能）时，`Sender` 自动从 textarea 切换为 `contenteditable` 词槽编辑器。

- `content` 词槽可直接输入；`input` 为内嵌输入框；`select` 为内嵌下拉；`tag` 为固定标签；`custom` 为自定义渲染（VNode）
- `Backspace` 在词槽开头会整体删除该词槽；`@技能` 芯片同理
- `submit` 事件返回结构化数据：`value`（纯文本）+ `slotConfig`（分段数组）+ `skill`
- 实例方法：`insert(slots, position)` 插入内容、`getValue()` 获取结构化值、`focus({ cursor: 'slot', key })` 聚焦指定词槽
:::

一个用于大模型槽位填充（function calling）的结构化输入示例。`submit` 结果展示在下方。
</docs>

<script setup>
import { ElMessage, ElSwitch } from 'element-plus';
import { h, ref } from 'vue';
// h() 渲染函数中使用的组件无法被 unplugin-vue-components 识别，需显式引入样式
import 'element-plus/es/components/switch/style/css';

const senderRef = ref();

/** 词槽配置：传入后 Sender 自动进入词槽模式 */
const slotConfig = ref([
  { type: 'text', value: '我是' },
  {
    type: 'content',
    key: 'name',
    props: { defaultValue: '小 X', placeholder: '你的名字' }
  },
  { type: 'text', value: '，来自' },
  {
    type: 'select',
    key: 'city',
    props: {
      defaultValue: '北京',
      placeholder: '选择城市',
      options: ['北京', '上海', '广州', '深圳', '杭州']
    }
  },
  { type: 'text', value: '，项目' },
  {
    type: 'tag',
    key: 'project',
    props: { label: 'Element Plus X', value: 'Element Plus X' }
  },
  { type: 'text', value: '，通知' },
  {
    type: 'custom',
    key: 'notify',
    props: { defaultValue: true },
    customRender: (value, onChange) =>
      h(ElSwitch, {
        modelValue: value,
        'onUpdate:modelValue': onChange,
        activeText: '邮件',
        inactiveText: '短信',
        style: { verticalAlign: 'middle' }
      })
  }
]);

/** @技能 芯片 */
const skill = ref({
  value: 'weather_query',
  title: '天气查询',
  toolTip: '查询指定城市的实时天气',
  closable: true
});

/** 提交结果（结构化数据） */
const submitResult = ref(null);

function handleSubmit(value, slotConfig, skill) {
  submitResult.value = { value, slotConfig: slotConfig ?? [], skill };
  ElMessage.success(`纯文本：${value}`);
}

/** 实例方法演示 */
function insertAtEnd() {
  senderRef.value?.insert([{ type: 'text', value: '（已补充说明）' }], 'end');
}

function insertCursor() {
  senderRef.value?.insert(
    [
      {
        type: 'select',
        key: `lang_${Date.now()}`,
        props: { placeholder: '语言', options: ['中文', 'English'] }
      }
    ],
    'cursor'
  );
}

function focusNameSlot() {
  senderRef.value?.focus({ cursor: 'slot', key: 'name' });
}

function clearAll() {
  senderRef.value?.clear();
  submitResult.value = null;
}

function logValue() {
  console.log('getValue：', senderRef.value?.getValue());
  ElMessage.info('getValue 结果已打印到控制台');
}
</script>

<template>
  <div class="slot-sender-doc-demo">
    <div class="toolbar">
      <el-button type="primary" plain size="small" @click="insertAtEnd">
        末尾插入文本
      </el-button>
      <el-button type="primary" plain size="small" @click="insertCursor">
        光标处插入词槽
      </el-button>
      <el-button type="success" plain size="small" @click="focusNameSlot">
        聚焦 name 词槽
      </el-button>
      <el-button plain size="small" @click="logValue"> getValue </el-button>
      <el-button type="danger" plain size="small" @click="clearAll">
        清空
      </el-button>
    </div>

    <Sender
      ref="senderRef"
      :slot-config="slotConfig"
      :skill="skill"
      placeholder="词槽模式：请补全下方信息"
      clearable
      @submit="handleSubmit"
    />

    <div v-if="submitResult" class="result-box">
      <div class="result-title">submit 返回的结构化数据：</div>
      <div class="result-item">
        <b>value（纯文本）：</b>{{ submitResult.value }}
      </div>
      <div class="result-item">
        <b>skill：</b>{{ submitResult.skill?.value || '无' }}
      </div>
      <div class="result-item">
        <b>slotConfig：</b>
        <pre>{{ JSON.stringify(submitResult.slotConfig, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slot-sender-doc-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .result-box {
    border: 1px solid var(--el-border-color-light);
    border-radius: 8px;
    padding: 12px;
    font-size: 13px;

    .result-title {
      font-weight: 600;
      margin-bottom: 8px;
    }

    .result-item {
      margin-bottom: 4px;

      pre {
        background: var(--el-fill-color-light);
        border-radius: 4px;
        padding: 8px;
        max-height: 240px;
        overflow: auto;
      }
    }
  }
}
</style>
