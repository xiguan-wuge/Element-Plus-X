import type { VNode } from 'vue';

export interface SenderProps {
  modelValue?: string;
  placeholder?: string;
  autoSize?: {
    minRows: number;
    maxRows: number;
  };
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  allowSpeech?: boolean;
  submitType?: 'enter' | 'shiftEnter' | 'cmdOrCtrlEnter' | 'altEnter';
  headerAnimationTimer?: number;
  inputWidth?: string;

  // 变体属性
  variant?: 'default' | 'updown';
  showUpdown?: boolean;
  submitBtnDisabled?: boolean;

  // 新增 el-input 样式透传
  inputStyle?: string | CSSProperties | CSSProperties[] | string[];

  // 新增 el-popover 样式透传
  triggerStrings?: string[];
  triggerPopoverVisible?: boolean; // 指令提示框是否可见
  triggerPopoverWidth?: string;
  triggerPopoverLeft?: string;
  triggerPopoverOffset?: number;
  triggerPopoverPlacement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

  /* ===================== 词槽模式（Slot Mode）===================== */
  /** 词槽配置数组：传入后进入词槽模式（contenteditable 编辑器） */
  slotConfig?: SlotConfigType[];
  /** @技能配置：传入有效 value 后在输入区最前方渲染技能芯片 */
  skill?: SkillType;
}

export interface TriggerEvent {
  oldValue: string; // 明确触发的字符
  newValue: string; // 当前输入框的值
  triggerString?: string; // 触发的字符串
  isOpen: boolean; // 弹窗状态
}

/* ===================== 词槽模式（Slot Mode）类型定义 ===================== */

/** 词槽插入位置 */
export type InsertPosition = 'start' | 'end' | 'cursor';

export interface SlotConfigBaseType {
  type: 'text' | 'input' | 'select' | 'tag' | 'custom' | 'content';
  /** 格式化该词槽最终输出的文本（影响 value 与序列化结果） */
  formatResult?: (value: any) => string;
}

/** 纯文本段 */
export interface SlotConfigTextType extends SlotConfigBaseType {
  type: 'text';
  value?: string;
  key?: string;
  editable?: boolean;
  placeholder?: string;
}

/** 可编辑内容段（用户可直接在编辑区内部输入） */
export interface SlotConfigContentType extends SlotConfigBaseType {
  type: 'content';
  key: string;
  props?: {
    defaultValue?: any;
    placeholder?: string;
  };
}

/** 内嵌输入框段 */
export interface SlotConfigInputType extends SlotConfigBaseType {
  type: 'input';
  key: string;
  props?: {
    defaultValue?: string;
    placeholder?: string;
  };
}

/** 内嵌下拉选择段 */
export interface SlotConfigSelectType extends SlotConfigBaseType {
  type: 'select';
  key: string;
  props?: {
    defaultValue?: string;
    options: string[];
    placeholder?: string;
  };
}

/** 固定标签段（芯片） */
export interface SlotConfigTagType extends SlotConfigBaseType {
  type: 'tag';
  key: string;
  props?: {
    label: string | VNode;
    value?: string;
  };
}

/** 自定义渲染段 */
export interface SlotConfigCustomType extends SlotConfigBaseType {
  type: 'custom';
  key: string;
  props?: {
    defaultValue?: any;
    [key: string]: any;
  };
  customRender?: (
    value: any,
    onChange: (value: any) => void,
    props: {
      disabled?: boolean;
      readOnly?: boolean;
    },
    item: SlotConfigType
  ) => VNode;
}

export type SlotConfigType =
  | SlotConfigTextType
  | SlotConfigContentType
  | SlotConfigInputType
  | SlotConfigSelectType
  | SlotConfigTagType
  | SlotConfigCustomType;

/** @技能 配置（渲染在输入区最前方的可关闭芯片） */
export interface SkillType {
  /** 技能唯一标识（提交时返回） */
  value: string;
  /** 展示标题（默认取 value） */
  title?: string | VNode;
  /** 提示气泡内容 */
  toolTip?: string;
  /** 是否可关闭 */
  closable?:
    | boolean
    | {
        closeIcon?: VNode;
        onClose?: (e: MouseEvent) => void;
        disabled?: boolean;
      };
}

/** getValue / submit 返回的完整输入内容 */
export interface SenderSlotValue {
  /** 纯文本值（词槽值按 formatResult 格式化后拼接） */
  value: string;
  /** 结构化分段（文本段 + 词槽段，带各自的 value） */
  slotConfig: (SlotConfigType & { value?: string })[];
  /** 当前生效的 @技能 */
  skill?: SkillType;
}

export interface SenderEmits {
  // 双向绑定相关事件
  (event: 'update:modelValue', value: string): void;
  (event: 'update:triggerPopoverVisible', visible: boolean): void;
  // 操作事件（词槽模式下额外返回结构化词槽与技能信息）
  (
    event: 'submit',
    internalValue: string,
    slotConfig?: (SlotConfigType & { value?: string })[],
    skill?: SkillType
  ): void;
  (event: 'cancel', internalValue: string): void;
  // 录音状态变更事件
  (event: 'recordingChange', isRecording: boolean): void;
  // 触发器事件
  (event: 'trigger', value: TriggerEvent): void;
  // 文件粘贴事件
  (event: 'pasteFile', firstFile: File, fileList: FileList): void;
}

/** focus 方法支持的选项（词槽模式扩展 cursor/key） */
export interface SenderFocusOptions {
  preventScroll?: boolean;
  cursor?: 'start' | 'end' | 'all' | 'slot';
  /** cursor 为 'slot' 时，聚焦指定 key 的词槽 */
  key?: string;
}

/** Sender 对外暴露的实例方法 */
export interface SenderInstance {
  openHeader: () => boolean | void;
  closeHeader: () => void;
  clear: () => void;
  blur: () => void;
  focus: (options?: string | SenderFocusOptions) => void;
  submit: () => void;
  cancel: () => void;
  startRecognition: () => void;
  stopRecognition: () => void;
  /** 词槽模式：在指定位置插入文本/词槽 */
  insert: (
    slotConfig: SlotConfigType[],
    position?: InsertPosition,
    replaceCharacters?: string,
    preventScroll?: boolean
  ) => void;
  /** 获取完整输入内容（纯文本 + 结构化词槽 + 技能） */
  getValue: () => SenderSlotValue;
}
