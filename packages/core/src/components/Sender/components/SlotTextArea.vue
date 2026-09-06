<script setup lang="ts">
/**
 * 词槽编辑器（移植自 ant-design-x sender/components/SlotTextArea.tsx）
 *
 * 核心原则：
 * 1. Vue 只渲染 contenteditable 外壳，内部子节点全部命令式 DOM 操作
 * 2. 词槽宿主 span 由命令式创建，内部 UI（el-input/el-dropdown/custom）通过 Teleport 渲染
 * 3. 序列化：遍历 childNodes → 纯文本 value + 结构化 slotConfig（不产出 HTML）
 */
import type { CSSProperties } from 'vue';
import type {
  InsertPosition,
  SenderFocusOptions,
  SkillType,
  SlotConfigCustomType,
  SlotConfigType
} from '../types.d';
import { ArrowDown } from '@element-plus/icons-vue';
import useCursor from '../hooks/use-cursor';
import useSlotBuilder from '../hooks/use-slot-builder';
import useSlotConfigState from '../hooks/use-slot-config-state';
import SkillTag from './SkillTag.vue';

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    submitType?: 'enter' | 'shiftEnter' | 'cmdOrCtrlEnter' | 'altEnter';
    autoSize?: { minRows: number; maxRows: number };
    slotConfig?: SlotConfigType[];
    skill?: SkillType;
  }>(),
  {
    placeholder: '',
    readOnly: false,
    disabled: false,
    submitType: 'enter',
    autoSize: () => ({ minRows: 1, maxRows: 8 }),
    slotConfig: () => [],
    skill: undefined
  }
);

const emits = defineEmits<{
  send: [];
  change: [
    value: string,
    slotConfig: (SlotConfigType & { value?: string })[],
    skill?: SkillType
  ];
  keydown: [e: KeyboardEvent];
  keyup: [e: KeyboardEvent];
  paste: [e: ClipboardEvent];
  pasteFile: [files: FileList];
  focus: [e: FocusEvent];
  blur: [e: FocusEvent];
}>();

const prefixCls = 'el-sender';

/* ============================ Refs ============================ */
const editableRef = ref<HTMLDivElement>();
/** key → 词槽宿主 DOM（非响应式） */
const slotDomMap = new Map<string, HTMLSpanElement>();
let isComposition = false;
let keyLock = false;
let lastSelection: Range | null = null;
let skillDom: HTMLSpanElement | null = null;
let currentSkill: SkillType | null = null;
/** 防止 slotConfig 引用变化导致重建（对应 ant-design-x issue #1623） */
let lastConfigSignature = '';

/** 词槽宿主 → Teleport 目标（shallowReactive 避免代理 DOM 元素） */
const slotTeleportHosts = shallowReactive(new Map<string, HTMLElement>());

/* ============================ 状态与工具 ============================ */
const {
  slotConfigMap,
  slotValues,
  syncFromProps,
  mergeSlotConfig,
  getNodeInfo,
  getNodeTextValue,
  clear: clearSlotConfigState
} = useSlotConfigState(() => props.slotConfig);

const {
  buildSkillSpan,
  buildEditSlotSpan,
  buildSlotSpan,
  buildSpaceSpan,
  saveSlotDom,
  getSlotDom,
  getSlotLastDom
} = useSlotBuilder(prefixCls, {
  placeholder: props.placeholder,
  slotDomMap,
  slotConfigMap
});

const cursor = useCursor({
  getSlotDom,
  getNodeInfo,
  getEditorValue: () => getEditorValue()
});

/** 行高估算（用于 autoSize） */
const editorStyle = computed<CSSProperties>(() => {
  const rowHeight = 22;
  const padding = 8;
  const minHeight = (props.autoSize?.minRows ?? 1) * rowHeight + padding;
  const maxHeight = (props.autoSize?.maxRows ?? 8) * rowHeight + padding;
  // overflowY 内联设置，确保超出行数时可滚动（对齐 ant-design-x useInputHeight）
  return {
    minHeight: `${minHeight}px`,
    maxHeight: `${maxHeight}px`,
    overflowY: 'auto' as const
  };
});

/* ============================ 序列化 ============================ */
/** 遍历 childNodes：文本节点拼接为 value，词槽元素反查配置收集为 slotConfig */
function getEditorValue() {
  const editableDom = editableRef.value;
  const emptyRes = {
    value: '',
    slotConfig: [] as (SlotConfigType & { value?: string })[],
    skill: undefined
  };
  if (!editableDom) {
    return emptyRes;
  }

  const childNodes = editableDom.childNodes;
  if (childNodes.length === 0) {
    editableDom.innerHTML = '';
    skillDom = null;
    return emptyRes;
  }

  const hasSkill = !!props.skill?.value && !!skillDom;
  const result: string[] = Array.from({ length: childNodes.length });
  const currentSlotConfig: (SlotConfigType & { value?: string })[] = [];
  let currentSkillConfig: SkillType | undefined;
  let resultIndex = 0;

  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    const textValue = getNodeTextValue(node);
    result[resultIndex++] = textValue;

    if (node.nodeType === Node.TEXT_NODE) {
      if (textValue) {
        currentSlotConfig.push({ type: 'text', value: textValue });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const nodeInfo = getNodeInfo(node as HTMLElement);
      if (nodeInfo) {
        const { skillKey, slotKey, nodeType } = nodeInfo;
        if (skillKey && hasSkill) {
          currentSkillConfig = props.skill;
        }
        if (slotKey && nodeType !== 'nbsp') {
          const nodeConfig = slotConfigMap.get(slotKey);
          if (nodeConfig) {
            currentSlotConfig.push({ ...nodeConfig, value: textValue });
          }
        }
      }
    }
  }

  const finalValue = result.slice(0, resultIndex).join('');

  if (!currentSkillConfig) {
    skillDom = null;
  }

  return {
    value: finalValue,
    slotConfig: currentSlotConfig,
    skill: currentSkillConfig
  };
}

/* ============================ 值变更触发 ============================ */
function triggerValueChange() {
  const newValue = getEditorValue();

  // 空态时 skill 区域可编辑以展示 placeholder
  if (skillDom) {
    if (
      !newValue?.value &&
      newValue.slotConfig.length === 0 &&
      props.placeholder
    ) {
      skillDom.setAttribute('contenteditable', 'true');
      skillDom.classList.add(`${prefixCls}-skill-empty`);
    } else {
      skillDom.setAttribute('contenteditable', 'false');
      skillDom.classList.remove(`${prefixCls}-skill-empty`);
    }
  }

  emits('change', newValue.value, newValue.slotConfig, newValue.skill);
}

/* ============================ 词槽渲染 ============================ */
/** 生成词槽配置签名（剔除函数属性），用于防止引用变化触发重建 */
function configSignature(config: SlotConfigType[]): string {
  return JSON.stringify(config, (_key, value) => {
    if (typeof value === 'function') {
      return undefined;
    }
    return value;
  });
}

/** 根据配置构建节点列表（含宿主创建与 Teleport 目标登记） */
function getSlotListNode(
  slotConfig: readonly SlotConfigType[]
): (Text | HTMLElement)[] {
  const nodeList: (Text | HTMLElement)[] = [];

  return slotConfig.reduce<(Text | HTMLElement)[]>((nodes, config) => {
    if (config.type === 'text') {
      nodes.push(document.createTextNode(config.value || ''));
      return nodes;
    }

    const slotKey = config.key;
    if (!slotKey) {
      console.warn(`[ElementPlusX Sender] Slot key is missing: ${slotKey}`);
      return nodes;
    }

    if (config.type === 'content') {
      const slotDom = buildEditSlotSpan(config);
      const before = buildSpaceSpan(slotKey, 'before');
      const after = buildSpaceSpan(slotKey, 'after');
      // content 类型：初始值直接写入 DOM（用户后续可直接编辑）
      slotDom.innerHTML = (slotValues[slotKey] as string) || '';
      slotDom.setAttribute('data-placeholder', config.props?.placeholder || '');
      saveSlotDom(`${slotKey}_before`, before);
      saveSlotDom(slotKey, slotDom);
      saveSlotDom(`${slotKey}_after`, after);
      nodes.push(before, slotDom, after);
    } else {
      const slotDom = buildSlotSpan(slotKey);
      saveSlotDom(slotKey, slotDom);
      slotTeleportHosts.set(slotKey, slotDom);
      nodes.push(slotDom);
    }

    return nodes;
  }, nodeList);
}

function appendNodeList(nodes: (Text | HTMLElement)[]) {
  nodes.forEach(element => {
    editableRef.value?.appendChild(element);
  });
}

/** 按 props.slotConfig 重建编辑区（签名比对防死循环） */
function initRenderSlot() {
  const slotConfig = props.slotConfig;
  if (!slotConfig || slotConfig.length === 0 || !editableRef.value) {
    return;
  }

  const signature = configSignature(slotConfig);
  if (signature === lastConfigSignature) {
    return;
  }
  lastConfigSignature = signature;

  initClear();
  appendNodeList(getSlotListNode(slotConfig) as HTMLElement[]);
}

/** 清空编辑区与全部状态 */
function initClear() {
  const div = editableRef.value;
  if (!div) return;
  // 先卸载 Teleport 内容再清空 DOM
  slotTeleportHosts.forEach((_, key) => slotTeleportHosts.delete(key));
  clearRendererCache();
  div.innerHTML = '';
  skillDom = null;
  currentSkill = null;
  lastSelection = null;
  cursor.removeAllRanges();
  slotDomMap.clear();
}

/** 移除指定词槽 */
function removeSlot(key: string) {
  const editableDom = editableRef.value;
  if (!editableDom) return;

  editableDom.querySelectorAll(`[data-slot-key="${key}"]`).forEach(element => {
    element.remove();
  });

  slotDomMap.delete(key);
  slotTeleportHosts.delete(key);
  clearRendererCache(key);
  delete slotValues[key];

  triggerValueChange();
}

/* ============================ Skill 芯片 ============================ */
function insertSkill() {
  const skill = props.skill;
  if (!skill?.value) return;

  if (currentSkill !== skill) {
    removeSkill(false);
    currentSkill = skill;
    const skillSpan = buildSkillSpan(skill.value);
    const editableDom = editableRef.value;
    if (!editableDom) return;

    const range = document.createRange();
    range.setStart(editableDom, 0);
    range.insertNode(skillSpan);
    skillDom = skillSpan;
    slotTeleportHosts.set(`__skill__`, skillSpan);
    triggerValueChange();
  }
}

function removeSkill(isChange = true) {
  const editableDom = editableRef.value;
  if (!editableDom || !skillDom) return;
  slotTeleportHosts.delete('__skill__');
  skillDom.remove();
  skillDom = null;
  currentSkill = null;
  if (isChange) {
    triggerValueChange();
  }
}

/** skill 空态区域输入时，退出空态并聚焦末尾 */
function handleSkillAreaKeyEvent() {
  if (
    !skillDom ||
    !editableRef.value ||
    skillDom.getAttribute('contenteditable') === 'false'
  ) {
    return;
  }
  const selection = cursor.getSelection();
  if (
    !selection?.anchorNode ||
    !skillDom.contains(selection.anchorNode) ||
    !editableRef.value.contains(selection.anchorNode)
  ) {
    return;
  }
  skillDom.setAttribute('contenteditable', 'false');
  skillDom.classList.remove(`${prefixCls}-skill-empty`);
  focus({ cursor: 'end' });
}

/* ============================ 词槽值更新 ============================ */
function updateSlot(key: string, value: any) {
  slotValues[key] = value;
  const config = slotConfigMap.get(key);

  // content 类型的值需要同步写回 DOM（其余类型由 Vue 响应式更新 Teleport 内容）
  if (config?.type === 'content') {
    const slotDom = getSlotDom(key);
    if (slotDom) {
      slotDom.innerHTML = (value as string) || '';
      slotDom.setAttribute('data-placeholder', config.props?.placeholder || '');
    }
  }

  triggerValueChange();
}

/* ============================ 键盘与删除 ============================ */
/** 处理删除操作（退格 / 剪切 / delete），返回是否已处理 */
function handleDeleteOperation(
  e: KeyboardEvent | ClipboardEvent,
  operationType: 'backspace' | 'cut' | 'delete'
): boolean {
  if (!editableRef.value) return false;
  const { range, selection } = cursor.getRange();

  if (!selection || selection.rangeCount === 0) return false;
  const { focusOffset, anchorNode } = selection;
  if (!anchorNode || !editableRef.value.contains(anchorNode)) {
    return false;
  }

  // content 词槽内部：删除最后一个字符或全选删除时清空内容
  if (anchorNode.nodeType === Node.TEXT_NODE && range) {
    const parentElement = anchorNode.parentNode as HTMLElement;
    const nodeInfo = getNodeInfo(parentElement);
    const selectedText = range.toString();
    const isFullTextSelected =
      anchorNode.textContent?.length === selectedText.length;
    const isSingleCharAtEnd =
      anchorNode.textContent?.length === 1 && focusOffset === 1;
    if (
      nodeInfo?.slotConfig?.type === 'content' &&
      (isFullTextSelected || isSingleCharAtEnd)
    ) {
      e.preventDefault();
      if (operationType === 'cut') {
        cursor.copySelectionString();
      }
      (anchorNode.parentNode as HTMLElement).innerHTML = '';
      triggerValueChange();
      return true;
    }
  }

  // 退格且光标在节点开头：整体删除前一个词槽 / skill
  if (operationType === 'backspace' && focusOffset === 0) {
    const previousSibling = anchorNode.previousSibling;
    if (previousSibling) {
      const nodeInfo = getNodeInfo(previousSibling as HTMLElement);
      if (nodeInfo) {
        const { slotKey, skillKey } = nodeInfo;
        if (slotKey) {
          e.preventDefault();
          removeSlot(slotKey);
          return true;
        }
        if (skillKey) {
          e.preventDefault();
          removeSkill();
          return true;
        }
      }
    }
  }

  // 退格且光标挂在元素节点上（如文本节点删空后光标回到编辑器根节点）：
  // 前一个子节点为词槽 / skill 时整体删除，避免浏览器默认删除导致状态残留
  if (
    operationType === 'backspace' &&
    anchorNode.nodeType === Node.ELEMENT_NODE &&
    focusOffset > 0
  ) {
    const previousChild = (anchorNode as HTMLElement).childNodes[
      focusOffset - 1
    ];
    if (previousChild && previousChild.nodeType === Node.ELEMENT_NODE) {
      const nodeInfo = getNodeInfo(previousChild as HTMLElement);
      if (nodeInfo) {
        const { slotKey, skillKey, nodeType } = nodeInfo;
        if (slotKey && nodeType !== 'nbsp') {
          e.preventDefault();
          removeSlot(slotKey);
          return true;
        }
        if (skillKey) {
          e.preventDefault();
          removeSkill();
          return true;
        }
      }
    }
  }

  return false;
}

/** 判断当前按键是否触发提交 */
function shouldSubmitForm(e: KeyboardEvent): boolean {
  const { key, shiftKey, ctrlKey, altKey, metaKey } = e;
  if (key !== 'Enter') return false;

  switch (props.submitType) {
    case 'enter':
      return !shiftKey && !ctrlKey && !altKey && !metaKey;
    case 'shiftEnter':
      return shiftKey && !ctrlKey && !altKey && !metaKey;
    case 'cmdOrCtrlEnter':
      return (ctrlKey || metaKey) && !shiftKey && !altKey;
    case 'altEnter':
      return altKey && !shiftKey && !ctrlKey && !metaKey;
    default:
      return false;
  }
}

async function onInternalKeyDown(e: KeyboardEvent) {
  emits('keydown', e);

  if (keyLock || isComposition) {
    return;
  }

  // 退格删除
  if (e.key === 'Backspace') {
    if (handleDeleteOperation(e, 'backspace')) return;
  }

  // Enter 提交
  if (shouldSubmitForm(e)) {
    e.preventDefault();
    keyLock = true;
    emits('send');
    return;
  }

  // Ctrl/Cmd + A 全选
  if (
    (e.key === 'a' || e.key === 'A') &&
    (e.ctrlKey || e.metaKey) &&
    !e.shiftKey &&
    !e.altKey
  ) {
    cursor.setAllSelectCursor(editableRef.value!, skillDom);
    e.preventDefault();
    return;
  }

  handleSkillAreaKeyEvent();
}

function onInternalKeyUp(e: KeyboardEvent) {
  // Enter 键松开后解除提交锁定
  if (e.key === 'Enter') {
    keyLock = false;
  }
  emits('keyup', e);
}

/* ============================ 剪切 / 粘贴 ============================ */
async function onInternalCut(e: ClipboardEvent) {
  handleDeleteOperation(e, 'cut');
}

function onInternalPaste(e: ClipboardEvent) {
  e.preventDefault();
  const files = e.clipboardData?.files;
  const text = e.clipboardData?.getData('text/plain');

  if (!text && files?.length) {
    emits('pasteFile', files);
    return;
  }

  if (text) {
    const cleanedText = cursor.getCleanedText(text);
    let success = false;
    try {
      success = document.execCommand('insertText', false, cleanedText);
    } catch (err) {
      console.warn('[ElementPlusX Sender] insertText command failed:', err);
    }
    if (!success) {
      insert([{ type: 'text', value: cleanedText }]);
    }
  }

  emits('paste', e);
}

/* ============================ 输入 / 组合输入 ============================ */
/** 移除 <br>（仅 enter 提交模式下，粘贴/拖拽可能带入） */
function removeSpecificBRs(element: HTMLDivElement | null) {
  if (props.submitType !== 'enter' || !element) return;
  element.querySelectorAll('br').forEach(br => {
    br.remove();
  });
}

function onInternalCompositionStart() {
  isComposition = true;
}

function onInternalCompositionEnd() {
  isComposition = false;
  keyLock = false;
  triggerValueChange();
}

function onInternalInput() {
  removeSpecificBRs(editableRef.value ?? null);
  triggerValueChange();
}

/**
 * 不可编辑原子块（select / tag / custom / skill / nbsp 占位）上的 mousedown：
 * 阻止浏览器默认的光标跳动（caret 会被移到原子块附近），保持光标原位；
 * click 事件不受影响，下拉打开、skill 关闭等交互照常。
 * 宿主内嵌可聚焦表单控件（input 词槽）时手动聚焦控件，
 * 避免 preventDefault 后点击 wrapper 边距区域成为无响应死区
 * （ElInput 的 wrapper 无 mousedown 处理，聚焦完全依赖浏览器默认行为）。
 */
function onInternalMouseDown(e: MouseEvent) {
  const editor = editableRef.value;
  const target = e.target as HTMLElement | null;
  if (!editor || !target || target === editor) {
    return;
  }
  // 未命中不可编辑原子块宿主（content 词槽、skill 空态占位区、编辑区空白等）：保持原生行为
  const host = target.closest('[data-slot-key], [data-skill-key]');
  if (
    !host ||
    host === editor ||
    host.getAttribute('contenteditable') !== 'false'
  ) {
    return;
  }
  // 目标本身可聚焦 / 可编辑（input 词槽内嵌输入框、skill 关闭按钮等）：保持原生聚焦与定位
  const focusable = target.closest(
    'input, textarea, button, [contenteditable="true"]'
  );
  if (focusable && focusable !== editor) {
    return;
  }
  // 原子块非控件区域：阻止默认光标跳动，保持光标原位
  e.preventDefault();
  // 宿主内嵌文本输入控件（input 词槽的内嵌输入框）：手动聚焦
  // 仅聚焦文本类控件且排除零尺寸控件（如 el-switch 内部用于表单集成的隐藏 checkbox），
  // 避免误聚焦导致 editor 失焦、光标消失
  const control = host.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    'input, textarea'
  );
  if (
    control &&
    !props.disabled &&
    !control.disabled &&
    control.offsetWidth > 0 &&
    (control instanceof HTMLTextAreaElement ||
      [
        'text',
        'search',
        'tel',
        'url',
        'email',
        'password',
        'number',
        ''
      ].includes(control.type))
  ) {
    control.focus();
  }
}

function onInternalFocus(e: FocusEvent) {
  emits('focus', e);
}

function onInternalBlur(e: FocusEvent) {
  if (keyLock) {
    keyLock = false;
  }
  const { range } = cursor.getRange();
  lastSelection = range;

  const timer = setTimeout(() => {
    lastSelection = null;
    clearTimeout(timer);
  }, 200);

  emits('blur', e);
}

/** 光标落在编辑区起点且有 skill 时，跳过 skill 芯片 */
function onInternalSelect() {
  const editableDom = editableRef.value;
  const selection = cursor.getSelection();
  if (
    editableDom &&
    selection?.focusNode === editableDom &&
    selection.focusOffset === 0 &&
    getEditorValue().skill
  ) {
    cursor.setCursorPosition(editableDom, editableRef.value!, 1);
  }
}

/* ============================ 实例方法 ============================ */
/** 获取插入上下文（cursor 位置解析） */
function getInsertContext(
  position: InsertPosition | undefined,
  editableDom: HTMLDivElement
) {
  const {
    type,
    slotKey,
    slotType,
    range: lastRange,
    selection
  } = cursor.getInsertPosition(position, editableDom, lastSelection);

  if (!selection) {
    return { range: null, selection: null, type, slotKey, slotType };
  }

  let range: Range | null = null;

  switch (type) {
    case 'end':
      range = cursor.getEndRange(editableDom);
      break;
    case 'start':
      range = cursor.getStartRange(editableDom);
      break;
    case 'slot':
      range = cursor.getRange().range;
      break;
    case 'box':
      range = lastRange || null;
      if (range && skillDom && range.collapsed && range.startOffset === 0) {
        range.setStartAfter(skillDom);
      }
      break;
  }

  return { range, selection, type, slotKey, slotType };
}

/** 处理待替换字符（如 @ 提及触发字符） */
function handleCharacterReplacement(
  range: Range,
  replaceCharacters: string,
  editableDom: HTMLDivElement
): void {
  const {
    value: textBeforeCursor,
    startContainer,
    startOffset
  } = cursor.getTextBeforeCursor(editableDom);
  const cursorPosition = textBeforeCursor.length;
  if (
    cursorPosition >= replaceCharacters.length &&
    textBeforeCursor.endsWith(replaceCharacters) &&
    startContainer &&
    startOffset >= 0
  ) {
    range.setStart(startContainer, startOffset - replaceCharacters.length);
    range.setEnd(startContainer, startOffset);
    range.deleteContents();
  }
}

/** 按位置插入节点 */
function insertNodesWithPosition(
  slotNodes: (Text | HTMLElement)[],
  range: Range,
  context: { type: string; slotKey?: string; slotType?: SlotConfigType['type'] }
): void {
  const { type, slotKey, slotType } = context;

  let shouldSkipFirstNode = true;
  slotNodes.forEach(node => {
    // 插入目标在某个词槽内部时，从该词槽的末尾开始插入
    if (
      shouldSkipFirstNode &&
      type === 'slot' &&
      (slotType !== 'content' || node.nodeType !== Node.TEXT_NODE) &&
      slotKey
    ) {
      shouldSkipFirstNode = false;
      const lastDom = getSlotLastDom(slotKey, slotType);
      if (lastDom) {
        range.setStartAfter(lastDom as HTMLSpanElement);
      }
    }

    range.insertNode(node);
    range.setStartAfter(node);
  });
}

/** 插入文本 / 词槽（对外暴露） */
function insert(
  slotConfig: SlotConfigType[],
  position: InsertPosition = 'cursor',
  replaceCharacters?: string,
  preventScroll?: boolean
) {
  const editableDom = editableRef.value;
  if (!editableDom) return;

  try {
    // 合并配置并生成节点
    mergeSlotConfig(slotConfig);
    const slotNodes = getSlotListNode(slotConfig);
    if (slotNodes.length === 0) return;

    const insertContext = getInsertContext(position, editableDom);
    if (!insertContext.range || !insertContext.selection) return;

    const { range, selection } = insertContext;

    if (replaceCharacters?.length) {
      handleCharacterReplacement(range, replaceCharacters, editableDom);
    }
    range.deleteContents();
    insertNodesWithPosition(slotNodes, range, insertContext);

    // 设置光标并触发更新
    const lastNode = slotNodes[slotNodes.length - 1];
    cursor.setAfterNodeFocus(
      lastNode,
      editableDom,
      range,
      selection,
      preventScroll
    );

    setTimeout(() => {
      triggerValueChange();
    }, 0);
  } catch (error) {
    console.warn('[ElementPlusX Sender] Insert operation failed:', error);
  }
}

/** 聚焦（支持 start/end/all/slot） */
function focus(options?: SenderFocusOptions) {
  const mergeOptions = {
    preventScroll: options?.preventScroll ?? false,
    cursor: options?.cursor ?? ('end' as const),
    key: options?.key
  };

  switch (mergeOptions.cursor) {
    case 'slot':
      cursor.setSlotFocus(
        editableRef.value!,
        mergeOptions.key,
        mergeOptions.preventScroll
      );
      break;
    case 'start':
      cursor.setStartCursor(editableRef.value!, mergeOptions.preventScroll);
      break;
    case 'all':
      cursor.setAllSelectCursor(
        editableRef.value!,
        skillDom,
        mergeOptions.preventScroll
      );
      break;
    case 'end':
      cursor.setEndCursor(editableRef.value!, mergeOptions.preventScroll);
      break;
  }
}

function blur() {
  editableRef.value?.blur();
}

function clear() {
  const editableDom = editableRef.value;
  if (!editableDom) return;
  slotTeleportHosts.forEach((_, key) => slotTeleportHosts.delete(key));
  editableDom.innerHTML = '';
  currentSkill = null;
  skillDom = null;
  clearSlotConfigState();
  lastConfigSignature = '';
  insertSkill();
  lastSelection = null;
  slotDomMap.clear();
  triggerValueChange();
}

function getValue() {
  return getEditorValue();
}

defineExpose({
  nativeElement: computed(() => editableRef.value),
  focus,
  blur,
  insert,
  clear,
  getValue
});

/* ============================ 生命周期 ============================ */
/**
 * select 词槽下拉 popper teleport 到 body（编辑器之外），浏览器点击下拉项的默认行为
 * 会把选区移出编辑器；popper 隐藏后选区失效，浏览器会重建到聚焦编辑器的开头（光标跳变）。
 * 在 document 级拦截 popper 内的 mousedown 默认行为，保证选区 / 焦点全程留在编辑器
 * （click 正常派发，下拉选择不受影响）。
 */
function onDocumentMouseDown(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (target?.closest?.('.el-sender-slot-select-popper')) {
    e.preventDefault();
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentMouseDown);
  syncFromProps();
  initRenderSlot();
  if (!props.skill?.value) {
    triggerValueChange();
  } else {
    insertSkill();
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentMouseDown);
});

watch(
  () => props.slotConfig,
  () => {
    syncFromProps();
    initRenderSlot();
    if (!props.skill?.value) {
      triggerValueChange();
    } else {
      insertSkill();
    }
  }
);

watch(
  () => props.skill,
  () => {
    // skill 被移除时同步删除芯片
    if (!props.skill?.value && currentSkill) {
      removeSkill(false);
    }
    insertSkill();
  }
);

/* ============================ select 词槽打开态 ============================ */
/** 当前打开的 select 词槽 key（下拉打开时高亮边框，对齐 ant-design-x -open 样式） */
const openedSelectKey = ref<string>();

function handleSelectVisibleChange(key: string, visible: boolean) {
  openedSelectKey.value = visible ? key : undefined;
}

/* ============================ Teleport 渲染辅助 ============================ */
function getTeleportConfig(key: string): SlotConfigType | undefined {
  return slotConfigMap.get(key);
}

function getTeleportProps(key: string): Record<string, any> {
  return (getTeleportConfig(key) as any)?.props || {};
}

/**
 * 渲染器缓存：保证函数式组件身份稳定，避免 slotValues 变化导致组件重挂载
 * （配置每次渲染时从 slotConfigMap 重新读取，避免闭包过期）
 */
const rendererCache = new Map<string, () => any>();

function getCustomRenderer(key: string) {
  if (!rendererCache.has(key)) {
    rendererCache.set(key, () => {
      const config = slotConfigMap.get(key) as SlotConfigCustomType;
      const value = slotValues[key];
      return config?.customRender?.(
        value,
        (v: any) => updateSlot(key, v),
        { disabled: props.disabled, readOnly: props.readOnly },
        config
      );
    });
  }
  return rendererCache.get(key)!;
}

function getTagRenderer(key: string) {
  if (!rendererCache.has(key)) {
    rendererCache.set(key, () => {
      const config = getTeleportConfig(key) as any;
      return config?.props?.label ?? config?.props?.value ?? '';
    });
  }
  return rendererCache.get(key)!;
}

function clearRendererCache(key?: string) {
  if (key) {
    rendererCache.delete(key);
  } else {
    rendererCache.clear();
  }
}
</script>

<template>
  <div
    ref="editableRef"
    role="textbox"
    tabindex="0"
    class="el-sender-input el-sender-input-slot"
    :class="{ 'el-sender-input-slot-disabled': disabled }"
    :style="editorStyle"
    :data-placeholder="placeholder"
    :contenteditable="!readOnly && !disabled"
    spellcheck="false"
    @mousedown="onInternalMouseDown"
    @cut="onInternalCut"
    @keydown="onInternalKeyDown"
    @keyup="onInternalKeyUp"
    @paste="onInternalPaste"
    @compositionstart="onInternalCompositionStart"
    @compositionend="onInternalCompositionEnd"
    @focus="onInternalFocus"
    @blur="onInternalBlur"
    @select="onInternalSelect"
    @input="onInternalInput"
  />

  <!-- 词槽 UI：Teleport 到命令式创建的宿主节点 -->
  <template v-for="key in Array.from(slotTeleportHosts.keys())" :key="key">
    <Teleport :to="slotTeleportHosts.get(key)!">
      <!-- input 词槽 -->
      <el-input
        v-if="getTeleportConfig(key)?.type === 'input'"
        :model-value="slotValues[key]"
        class="el-sender-slot-input"
        size="small"
        :placeholder="getTeleportProps(key)?.placeholder || ''"
        :read-only="readOnly"
        :disabled="disabled"
        :validate-event="false"
        spellcheck="false"
        @update:model-value="(v: string) => updateSlot(key, v)"
        @keydown.stop
      />

      <!-- select 词槽 -->
      <el-dropdown
        v-else-if="getTeleportConfig(key)?.type === 'select'"
        :disabled="readOnly || disabled"
        trigger="click"
        popper-class="el-sender-slot-select-popper"
        @command="(cmd: any) => updateSlot(key, cmd)"
        @visible-change="(v: boolean) => handleSelectVisibleChange(key, v)"
      >
        <span
          class="el-sender-slot-select"
          :class="{
            'el-sender-slot-select-placeholder': !slotValues[key],
            'el-sender-slot-select-open': openedSelectKey === key
          }"
        >
          <span
            class="el-sender-slot-select-value"
            :data-placeholder="getTeleportProps(key)?.placeholder"
          >
            {{ slotValues[key] || '' }}
          </span>
          <el-icon class="el-sender-slot-select-arrow">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="opt in getTeleportProps(key)?.options || []"
              :key="opt"
              :command="opt"
              :class="{
                'el-sender-slot-select-option-active': slotValues[key] === opt
              }"
            >
              {{ opt }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- tag 词槽 -->
      <span
        v-else-if="getTeleportConfig(key)?.type === 'tag'"
        class="el-sender-slot-tag"
      >
        <component :is="getTagRenderer(key)" />
      </span>

      <!-- custom 词槽 -->
      <component
        :is="getCustomRenderer(key)"
        v-else-if="getTeleportConfig(key)?.type === 'custom'"
      />
    </Teleport>
  </template>

  <!-- skill 芯片 -->
  <Teleport
    v-if="skill && slotTeleportHosts.has('__skill__')"
    :to="slotTeleportHosts.get('__skill__')!"
  >
    <SkillTag :skill="skill" @remove="removeSkill()" />
  </Teleport>
</template>
