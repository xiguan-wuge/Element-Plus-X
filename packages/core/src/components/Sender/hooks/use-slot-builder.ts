/**
 * 词槽 DOM 节点构建器（移植自 ant-design-x sender/hooks/use-slot-builder.ts）
 * 创建编辑区内的各类原生 span / 文本节点
 */
import type { SlotConfigType } from '../types.d';

export interface UseSlotBuilderOptions {
  placeholder?: string;
  slotDomMap: Map<string, HTMLSpanElement>;
  slotConfigMap: Map<string, SlotConfigType>;
}

export function useSlotBuilder(
  prefixCls: string,
  options: UseSlotBuilderOptions
) {
  const { placeholder, slotDomMap, slotConfigMap } = options;

  /** 创建 skill 芯片宿主（contenteditable=false，Vue 组件通过 Teleport 渲染进内部） */
  function buildSkillSpan(key: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.dataset.skillKey = key;
    span.dataset.placeholder = placeholder || '';
    span.className = `${prefixCls}-skill`;
    return span;
  }

  /** 创建可编辑词槽宿主（content 类型：用户可直接输入） */
  function buildEditSlotSpan(config: SlotConfigType): HTMLSpanElement {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'true');
    span.dataset.slotKey = (config as any).key;
    span.className = `${prefixCls}-slot ${prefixCls}-slot-content`;
    return span;
  }

  /** 创建不可编辑词槽宿主 */
  function buildSlotSpan(key: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.dataset.slotKey = key;
    span.className = `${prefixCls}-slot`;
    return span;
  }

  /** 创建词槽前后占位（保证 content 词槽前后有空格边界，序列化时输出 ' '） */
  function buildSpaceSpan(
    slotKey: string,
    positions: 'before' | 'after'
  ): HTMLSpanElement {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.dataset.slotKey = slotKey;
    span.dataset.nodeType = 'nbsp';
    span.className = `${prefixCls}-slot-${positions} ${prefixCls}-slot-no-width`;
    span.textContent = '\u00A0';
    return span;
  }

  function saveSlotDom(key: string, dom: HTMLSpanElement): void {
    slotDomMap.set(key, dom);
  }

  function getSlotDom(key: string): HTMLSpanElement | undefined {
    return slotDomMap.get(key);
  }

  /** 获取词槽的最后一个宿主节点（content 类型为 after 占位） */
  function getSlotLastDom(slotKey: string, slotType?: SlotConfigType['type']) {
    const mergeSlotType = slotType ?? slotConfigMap.get(slotKey)?.type;
    if (mergeSlotType === 'content') {
      return getSlotDom(`${slotKey}_after`);
    }
    return getSlotDom(slotKey);
  }

  return {
    buildSkillSpan,
    buildEditSlotSpan,
    buildSlotSpan,
    buildSpaceSpan,
    saveSlotDom,
    getSlotDom,
    getSlotLastDom
  };
}

export default useSlotBuilder;
