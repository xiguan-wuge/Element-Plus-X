import type { SlotConfigType } from '../types.d';
/**
 * 词槽配置与值状态管理（移植自 ant-design-x sender/hooks/use-slot-config-state.ts）
 * - slotConfigMap：key → 词槽配置（非响应式，仅命令式读取）
 * - slotValues：key → 词槽值（响应式，驱动 Teleport 内的 Vue 组件更新）
 */
import { reactive } from 'vue';

export interface NodeInfo {
  slotKey?: string;
  nodeType?: string;
  skillKey?: string;
  slotConfig?: SlotConfigType;
  targetNode: HTMLElement;
}

type SlotValues = Record<string, any>;

/** 支持通过 props.defaultValue 初始化值的类型 */
const SUPPORTED_INPUT_TYPES = new Set(['input', 'select', 'custom', 'content']);

/** 从词槽配置中提取默认值构建 slotValues */
function buildSlotValues(slotConfig: readonly SlotConfigType[]): SlotValues {
  return (
    slotConfig?.reduce<SlotValues>((acc, node) => {
      const { key, type } = node;
      if (!key) return acc;

      const props = (node as any).props || {};
      const defaultValue = SUPPORTED_INPUT_TYPES.has(type)
        ? props.defaultValue
        : (props.value ?? props.label);

      acc[key] = defaultValue ?? '';
      return acc;
    }, {}) ?? {}
  );
}

/** 将配置数组写入 Map */
function buildSlotConfigMap(
  slotConfig: readonly SlotConfigType[],
  slotConfigMap: Map<string, SlotConfigType>
) {
  slotConfig?.forEach(node => {
    if (node.key) slotConfigMap.set(node.key, node);
  });
}

export function useSlotConfigState(
  slotConfigGetter: () => readonly SlotConfigType[] | undefined
) {
  /** 词槽值（响应式：驱动 Teleport 内 Vue 组件） */
  const slotValues = reactive<SlotValues>({});
  /** 词槽配置映射（非响应式：仅供命令式序列化/键盘处理读取） */
  const slotConfigMap = new Map<string, SlotConfigType>();
  /** 运行时通过 insert() 动态插入的 key（props.slotConfig 变更时保留其值） */
  const runtimeKeys = new Set<string>();

  /** 根据 props.slotConfig 同步配置与初始值（保留运行时插入 key 的当前值） */
  function syncFromProps(): void {
    const slotConfig = slotConfigGetter();
    if (!slotConfig) return;

    slotConfigMap.forEach((_, key) => {
      if (!runtimeKeys.has(key)) slotConfigMap.delete(key);
    });

    buildSlotConfigMap(slotConfig, slotConfigMap);

    const newValues = buildSlotValues(slotConfig);
    runtimeKeys.forEach(key => {
      if (key in slotValues) newValues[key] = slotValues[key];
    });
    Object.keys(slotValues).forEach(key => {
      if (!(key in newValues)) delete slotValues[key];
    });
    Object.assign(slotValues, newValues);
  }

  /** 运行时合并新配置（ref.insert 使用） */
  function mergeSlotConfig(newSlotConfig: SlotConfigType[]): void {
    const newValues = buildSlotValues(newSlotConfig);

    newSlotConfig.forEach(node => {
      if (node.key) {
        slotConfigMap.set(node.key, node);
        runtimeKeys.add(node.key);
      }
    });

    Object.assign(slotValues, newValues);
  }

  /** 读取节点的词槽信息 */
  function getNodeInfo(targetNode: HTMLElement): NodeInfo | null {
    if (!targetNode?.dataset) return null;
    const { dataset } = targetNode;
    return {
      slotKey: dataset.slotKey,
      nodeType: dataset.nodeType,
      skillKey: dataset.skillKey,
      slotConfig: dataset.slotKey
        ? slotConfigMap.get(dataset.slotKey)
        : undefined,
      targetNode
    };
  }

  /**
   * 读取节点应输出的文本值：
   * - 文本节点 → textContent
   * - skill → ''（不计入 value）
   * - nbsp 占位 → ' '
   * - content 词槽 → DOM 实际文本（用户可直接编辑）
   * - 其他词槽 → slotValues[key]（可被 formatResult 格式化）
   */
  function getNodeTextValue(node: Node): string {
    const nodeType = node.nodeType;

    if (nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const element = node as HTMLElement;
    const nodeInfo = getNodeInfo(element);

    if (!nodeInfo) {
      return element.textContent || '';
    }

    const { slotKey, skillKey, nodeType: infoNodeType, slotConfig } = nodeInfo;
    if (skillKey) {
      return '';
    }

    const textContent = element.textContent || '';

    if (slotKey) {
      if (infoNodeType === 'nbsp') {
        return ' ';
      }
      if (!slotConfig) {
        return textContent;
      }
      const slotValue =
        slotConfig.type === 'content'
          ? textContent
          : (slotValues[slotKey] ?? '');
      return slotConfig.formatResult?.(slotValue) ?? String(slotValue);
    }

    return textContent;
  }

  /** 清空全部词槽状态 */
  function clear(): void {
    slotConfigMap.clear();
    runtimeKeys.clear();
    Object.keys(slotValues).forEach(key => {
      delete slotValues[key];
    });
  }

  return {
    slotConfigMap,
    slotValues,
    syncFromProps,
    mergeSlotConfig,
    getNodeInfo,
    getNodeTextValue,
    clear
  };
}

export default useSlotConfigState;
