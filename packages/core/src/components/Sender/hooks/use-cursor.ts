/**
 * 光标 / 选区 / Range 操作集合（移植自 ant-design-x sender/hooks/use-cursor.ts）
 * 纯命令式 DOM 操作，不依赖框架响应式
 */
import type { InsertPosition, SlotConfigType } from '../types.d';

export interface NodeInfo {
  slotKey?: string;
  nodeType?: string;
  skillKey?: string;
  slotConfig?: SlotConfigType;
  targetNode: HTMLElement;
}

export interface UseCursorOptions {
  getSlotDom: (key: string) => HTMLSpanElement | undefined;
  getNodeInfo: (element: HTMLElement) => NodeInfo | null;
  getEditorValue: () => { value: string; slotConfig: any[]; skill?: any };
}

export function useCursor(options?: UseCursorOptions) {
  function getSelection(): Selection | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.getSelection();
  }

  /** 向上找到编辑区内最外层的 span（词槽宿主节点） */
  function findOuterContainer(
    node: Node,
    editableDom: HTMLElement
  ): HTMLElement {
    if (!node || !editableDom) {
      return editableDom;
    }
    let currentNode: Node | null = node;
    let lastSpan: HTMLElement | null = null;

    if (currentNode.nodeType === Node.TEXT_NODE) {
      currentNode = currentNode.parentElement;
    }

    while (currentNode && currentNode !== editableDom) {
      if (
        currentNode instanceof HTMLElement &&
        currentNode.tagName === 'SPAN'
      ) {
        lastSpan = currentNode;
      }
      currentNode = currentNode.parentElement;
    }

    return lastSpan || editableDom;
  }

  function getRange(): { range: Range | null; selection: Selection | null } {
    const selection = getSelection();
    if (!selection) {
      return { range: null, selection };
    }
    try {
      const range = selection.getRangeAt(0) || document.createRange();
      return { range, selection };
    } catch {
      const range = document.createRange();
      return { range, selection };
    }
  }

  function setRange(range: Range, selection: Selection): void {
    if (!range || !selection) {
      return;
    }
    try {
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.warn('[ElementPlusX Sender] Failed to set range:', error);
    }
  }

  function removeAllRanges(): void {
    const selection = getSelection();
    if (!selection) {
      return;
    }
    try {
      selection.removeAllRanges();
    } catch (error) {
      console.warn('[ElementPlusX Sender] Failed to remove ranges:', error);
    }
  }

  function focusDom(
    targetNode: HTMLElement | null,
    preventScroll = false
  ): void {
    if (!targetNode || typeof targetNode.focus !== 'function') {
      return;
    }
    try {
      targetNode.focus({ preventScroll });
    } catch (error) {
      console.warn('[ElementPlusX Sender] Failed to focus element:', error);
    }
  }

  /** 光标移到末尾 */
  function setEndCursor(
    targetNode: HTMLElement | null,
    preventScroll = false
  ): void {
    if (!targetNode) {
      return;
    }
    focusDom(targetNode, preventScroll);
    const { range, selection } = getRange();
    if (range && selection) {
      try {
        range.selectNodeContents(targetNode);
        range.collapse(false);
        setRange(range, selection);
      } catch (error) {
        console.warn('[ElementPlusX Sender] Failed to set end cursor:', error);
      }
    }
  }

  /** 光标移到开头 */
  function setStartCursor(
    targetNode: HTMLElement | null,
    preventScroll = false
  ): void {
    if (!targetNode) {
      return;
    }
    focusDom(targetNode, preventScroll);
    const { range, selection } = getRange();
    if (range && selection) {
      try {
        range.selectNodeContents(targetNode);
        range.collapse(true);
        setRange(range, selection);
      } catch (error) {
        console.warn(
          '[ElementPlusX Sender] Failed to set start cursor:',
          error
        );
      }
    }
  }

  /** 全选（支持 skill 芯片存在时跳过第一个节点） */
  function setAllSelectCursor(
    targetNode: HTMLElement | null,
    skillDom: HTMLSpanElement | null,
    preventScroll = false
  ): void {
    if (!targetNode) {
      return;
    }
    focusDom(targetNode, preventScroll);
    const { range, selection } = getRange();
    if (range && selection) {
      try {
        range.selectNodeContents(targetNode);
        if (skillDom) {
          range.setStart(targetNode, 1);
        }
        setRange(range, selection);
      } catch (error) {
        console.warn(
          '[ElementPlusX Sender] Failed to select all content:',
          error
        );
      }
    }
  }

  /** 设置光标到目标节点内的指定子节点位置 */
  function setCursorPosition(
    targetNode: HTMLElement | null,
    editableNode: HTMLElement | null,
    position: number,
    preventScroll = false
  ): { range: Range | null; selection: Selection | null } {
    if (
      !targetNode ||
      typeof position !== 'number' ||
      position < 0 ||
      !editableNode
    ) {
      return { range: null, selection: null };
    }

    focusDom(editableNode, preventScroll);
    const { range, selection } = getRange();

    if (range && selection) {
      try {
        const maxPosition = Math.min(position, targetNode.childNodes.length);
        range.setStart(targetNode, maxPosition);
        range.setEnd(targetNode, maxPosition);
        range.collapse(false);
        setRange(range, selection);
      } catch (error) {
        console.warn(
          '[ElementPlusX Sender] Failed to set cursor position:',
          error
        );
      }
    }

    return { range, selection };
  }

  /** 聚焦到指定词槽（input 类型聚焦内部 input，content 类型聚焦内部文本） */
  function setSlotFocus(
    editableDom: HTMLElement | null,
    key?: string,
    preventScroll = false
  ): void {
    if (!options || !editableDom) return;

    const getFocusableElement = (slotKey: string): HTMLElement | null => {
      const slotDom = options.getSlotDom(slotKey);
      if (!slotDom) return null;

      const slotConfig = options.getNodeInfo(slotDom)?.slotConfig;
      if (!slotConfig) return null;

      if (slotConfig.type === 'input') {
        return slotDom.querySelector('input');
      }

      const nodeType = slotDom.getAttribute('data-node-type') || '';
      if (slotConfig.type === 'content' && nodeType !== 'nbsp') {
        return slotDom;
      }

      return null;
    };

    const findFocusableSlot = (targetKey?: string): HTMLElement | null => {
      if (!editableDom) return null;

      if (targetKey) {
        return getFocusableElement(targetKey);
      }

      for (const node of Array.from(editableDom.childNodes)) {
        const slotKey = (node as Element)?.getAttribute?.('data-slot-key');
        if (slotKey) {
          const focusableElement = getFocusableElement(slotKey);
          if (focusableElement) {
            return focusableElement;
          }
        }
      }

      return null;
    };

    const targetElement = findFocusableSlot(key);
    if (!targetElement) return;

    if (targetElement.nodeName === 'INPUT') {
      (targetElement as HTMLInputElement).focus({ preventScroll });
    } else {
      setCursorPosition(targetElement, editableDom, 0, preventScroll);
    }
  }

  /** 插入后聚焦到目标节点之后 */
  function setAfterNodeFocus(
    targetNode: Node,
    editableNode: HTMLElement,
    range: Range | null,
    selection: Selection | null,
    preventScroll = false
  ): void {
    if (!range || !selection) return;
    focusDom(editableNode, preventScroll);
    range.setStartAfter(targetNode);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /** 获取光标之前的文本 */
  function getTextBeforeCursor(targetNode: HTMLElement | null): {
    value: string;
    startContainer: Node | null;
    startOffset: number;
  } {
    if (!targetNode) {
      return { value: '', startContainer: null, startOffset: 0 };
    }

    const selection = getSelection();
    if (!selection || selection.rangeCount === 0) {
      return { value: '', startContainer: null, startOffset: 0 };
    }

    try {
      let range = selection.getRangeAt(0);
      let cloneRange = range.cloneRange();
      if (!targetNode.contains(range.startContainer)) {
        return { value: '', startContainer: null, startOffset: 0 };
      }

      if (range.endContainer === targetNode) {
        if (range.endContainer.lastChild?.nodeType === Node.TEXT_NODE) {
          const lastDom = range.endContainer.lastChild as Text;
          range = document.createRange();
          range.setStart(lastDom, lastDom.length);
          range.setEnd(lastDom, lastDom.length);
        }
      }
      cloneRange = range.cloneRange();
      cloneRange.selectNodeContents(targetNode);
      cloneRange.setEnd(range.startContainer, range.startOffset);

      const value = cloneRange.toString().replace(/\u200B/g, '');

      return {
        value,
        startContainer: range.startContainer,
        startOffset: range.startOffset
      };
    } catch (error) {
      console.warn(
        '[ElementPlusX Sender] Failed to get text before cursor:',
        error
      );
      return { value: '', startContainer: null, startOffset: 0 };
    }
  }

  /** 获取插入位置信息（cursor 时判断当前光标处于 box / slot / start / end） */
  function getInsertPosition(
    position: InsertPosition | undefined,
    editableDom: HTMLElement | null,
    lastSelection: Range | null
  ): {
    type: 'box' | 'slot' | 'end' | 'start';
    slotType?: SlotConfigType['type'];
    range?: Range;
    slotKey?: string;
    selection: Selection | null;
  } {
    if (position === 'start' || position === 'end') {
      return { type: position, selection: getSelection() };
    }

    let range: Range | null = null;
    let selection: Selection | null = null;

    if (lastSelection) {
      range = lastSelection;
      selection = getSelection();
    } else {
      const rangeResult = getRange();
      range = rangeResult.range;
      selection = rangeResult.selection;
    }

    if (!range || !selection) {
      return { type: 'end', selection };
    }

    if (!editableDom) {
      return { type: 'end', selection };
    }

    const isEndInEditableBox = editableDom.contains(range.endContainer);
    const isStartInEditableBox = editableDom.contains(range.startContainer);

    if (!isEndInEditableBox) {
      setEndCursor(editableDom, true);
      return { type: 'end', selection };
    }

    if (!isStartInEditableBox) {
      setStartCursor(editableDom, true);
      return { type: 'start', selection };
    }

    const endContainer = findOuterContainer(range.endContainer, editableDom);
    const startContainer = findOuterContainer(
      range.startContainer,
      editableDom
    );

    if (
      endContainer === startContainer &&
      startContainer !== editableDom &&
      options?.getNodeInfo
    ) {
      const { slotKey, slotConfig, skillKey } =
        options.getNodeInfo(endContainer) || ({} as NodeInfo);
      if (slotKey) {
        return {
          type: 'slot',
          slotKey: slotConfig?.key,
          slotType: slotConfig?.type,
          range,
          selection
        };
      }
      if (skillKey) {
        return { type: 'start', selection };
      }
    }

    return { type: 'box', range, selection };
  }

  /** 获取末尾插入范围 */
  function getEndRange(editableDom: HTMLElement): Range {
    const lastNode = editableDom.childNodes[editableDom.childNodes.length - 1];
    const targetIndex =
      lastNode?.nodeType === Node.TEXT_NODE && lastNode.textContent === '\n'
        ? editableDom.childNodes.length - 1
        : editableDom.childNodes.length;

    const result = setCursorPosition(editableDom, editableDom, targetIndex);
    return result.range || document.createRange();
  }

  /** 获取开头插入范围 */
  function getStartRange(editableDom: HTMLElement): Range {
    const startIndex = options?.getEditorValue?.().skill ? 1 : 0;
    const result = setCursorPosition(editableDom, editableDom, startIndex);
    return result.range || document.createRange();
  }

  /** 清理粘贴文本：移除零宽空格与换行 */
  function getCleanedText(ori: string): string {
    return ori
      .replace(/\u200B/g, '')
      .replace(/\n/g, '')
      .replace(/^\n+|\n+$/g, '');
  }

  /** 复制当前选区文本（剪切词槽时使用） */
  async function copySelectionString(): Promise<boolean> {
    try {
      const selection = getSelection();
      if (!selection) {
        return false;
      }

      const selectingString = selection.toString();
      if (!selectingString) {
        return false;
      }
      const cleanedText = getCleanedText(selectingString);
      await navigator.clipboard.writeText(cleanedText);
      return true;
    } catch (error) {
      console.warn('[ElementPlusX Sender] Failed to copy selection:', error);
      return false;
    }
  }

  return {
    getSelection,
    getRange,
    setRange,
    removeAllRanges,
    setEndCursor,
    setStartCursor,
    setAllSelectCursor,
    setCursorPosition,
    setSlotFocus,
    setAfterNodeFocus,
    getTextBeforeCursor,
    getInsertPosition,
    getEndRange,
    getStartRange,
    getCleanedText,
    copySelectionString
  };
}

export default useCursor;
