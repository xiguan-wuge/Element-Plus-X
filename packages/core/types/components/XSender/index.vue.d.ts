import { ChatNode, FocusType, ModelValue, XSenderProps } from "./types";
import { default as XSender } from "x-sender";
declare function getModelValue(): ModelValue;
declare function onClear(): void;
declare function focus(type: FocusType): void;
declare function blur(): void;
declare function selectAll(): void;
declare function setSelect(key: string, id: string): void;
declare function setInput(
  key: string,
  placeholder: string,
  defaultValue?: string,
): void;
declare function setMention(id: string): void;
declare function setTrigger(key: string, id: string): void;
declare function setChatNode(model: ChatNode[][]): void;
declare function setHtml(html: string): void;
declare function setText(txt: string): void;
declare function showSelect(key: string, elm: HTMLElement): void;
declare function showTip(props: Record<string, string>): void;
declare function closeTip(): void;
declare function __VLS_template(): {
  attrs: Partial<{}>;
  slots: {
    header?(_: {}): any;
    prefix?(_: {}): any;
    prefix?(_: {}): any;
    "action-list"?(_: {}): any;
    "action-list"?(_: {}): any;
    footer?(_: {}): any;
  };
  refs: {
    container: HTMLDivElement;
  };
  rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<
  XSenderProps,
  {
    getPlugin: () => typeof XSender;
    getSender: () => XSender | null;
    senderState: {
      isEmpty: boolean;
      textLength: number;
      tipShow: boolean;
    };
    blur: typeof blur;
    focus: typeof focus;
    clear: typeof onClear;
    selectAll: typeof selectAll;
    getModelValue: typeof getModelValue;
    setText: typeof setText;
    setHtml: typeof setHtml;
    setMention: typeof setMention;
    setTrigger: typeof setTrigger;
    setSelect: typeof setSelect;
    setInput: typeof setInput;
    setChatNode: typeof setChatNode;
    showTip: typeof showTip;
    closeTip: typeof closeTip;
    showSelect: typeof showSelect;
  },
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {} & {
    cancel: () => any;
    change: () => any;
    submit: () => any;
    pasteFile: (firstFile: File, fileList: FileList) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<XSenderProps> &
    Readonly<{
      onCancel?: (() => any) | undefined;
      onChange?: (() => any) | undefined;
      onSubmit?: (() => any) | undefined;
      onPasteFile?: ((firstFile: File, fileList: FileList) => any) | undefined;
    }>,
  {
    disabled: boolean;
    placeholder: string;
    loading: boolean;
    variant: "default" | "updown";
    clearable: boolean;
    submitType: "enter" | "shiftEnter";
    headerAnimationTimer: number;
    device: "pc" | "h5" | "auto";
    autoFocus: boolean;
    maxLength: number;
    customStyle: Partial<CSSStyleDeclaration>;
    mentionConfig: import("x-sender").MentionConfig;
    triggerConfig: import("x-sender").TriggerConfig[];
    selectConfig: import("x-sender").SelectConfig[];
    tipConfig: import("x-sender").TipConfig | boolean;
    getPlugin: () => typeof XSender;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  false,
  {
    container: HTMLDivElement;
  },
  HTMLDivElement
>;
declare const _default: __VLS_WithTemplateSlots<
  typeof __VLS_component,
  __VLS_TemplateResult["slots"]
>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
