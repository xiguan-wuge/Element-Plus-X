import { MentionOption, MentionSenderProps } from "./types.d.ts";
declare function openHeader(): false | undefined;
declare function closeHeader(): void;
declare function startRecognition(): void;
declare function stopRecognition(): void;
declare function submit(): void;
declare function cancel(): void;
declare function clear(): void;
declare function blur(): false | undefined;
declare function focus(type?: string): false | undefined;
declare function __VLS_template(): {
  attrs: Partial<{}>;
  slots: Readonly<Record<string, any>> & Record<string, any>;
  refs: {
    senderRef: HTMLDivElement;
    inputRef: unknown;
  };
  rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<
  MentionSenderProps,
  {
    openHeader: typeof openHeader;
    closeHeader: typeof closeHeader;
    clear: typeof clear;
    blur: typeof blur;
    focus: typeof focus;
    submit: typeof submit;
    cancel: typeof cancel;
    startRecognition: typeof startRecognition;
    stopRecognition: typeof stopRecognition;
    popoverVisible: globalThis.ComputedRef<any>;
    inputInstance: globalThis.ComputedRef<any>;
  },
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {} & {
    search: (pattern: string, prefix: string) => any;
    select: (option: MentionOption, prefix: string) => any;
    cancel: (internalValue: string) => any;
    submit: (internalValue: string) => any;
    "update:modelValue": (value: string) => any;
    recordingChange: (isRecording: boolean) => any;
    pasteFile: (firstFile: File, fileList: FileList) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<MentionSenderProps> &
    Readonly<{
      onSearch?: ((pattern: string, prefix: string) => any) | undefined;
      onSelect?: ((option: MentionOption, prefix: string) => any) | undefined;
      onCancel?: ((internalValue: string) => any) | undefined;
      onSubmit?: ((internalValue: string) => any) | undefined;
      "onUpdate:modelValue"?: ((value: string) => any) | undefined;
      onRecordingChange?: ((isRecording: boolean) => any) | undefined;
      onPasteFile?: ((firstFile: File, fileList: FileList) => any) | undefined;
    }>,
  {
    options: MentionOption[];
    placeholder: string;
    variant: "default" | "updown";
    modelValue: string;
    autoSize: {
      minRows: number;
      maxRows: number;
    };
    submitType: "enter" | "shiftEnter" | "cmdOrCtrlEnter" | "altEnter";
    headerAnimationTimer: number;
    inputWidth: string;
    showUpdown: boolean;
    submitBtnDisabled: boolean;
    inputStyle: string | CSSProperties | CSSProperties[] | string[];
    filterOption: (pattern: string, option: MentionOption) => boolean;
    whole: boolean;
    checkIsWhole: (pattern: string, prefix: string) => boolean;
    triggerLoading: boolean;
    triggerStrings: string[];
    triggerSplit: string;
    triggerPopoverPlacement: "bottom" | "top";
    triggerPopoverOffset: number;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  false,
  {
    senderRef: HTMLDivElement;
    inputRef: unknown;
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
