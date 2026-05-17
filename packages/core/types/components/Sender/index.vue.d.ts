import { SenderProps } from "./types.d.ts";
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
    popoverRef: unknown;
  };
  rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<
  SenderProps,
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
    popoverVisible: globalThis.WritableComputedRef<boolean, boolean>;
    inputInstance: globalThis.ComputedRef<any>;
  },
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {} & {
    cancel: (internalValue: string) => any;
    submit: (internalValue: string) => any;
    trigger: (value: import("./types.d.ts").TriggerEvent) => any;
    "update:modelValue": (value: string) => any;
    recordingChange: (isRecording: boolean) => any;
    pasteFile: (firstFile: File, fileList: FileList) => any;
    "update:triggerPopoverVisible": (visible: boolean) => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<SenderProps> &
    Readonly<{
      onCancel?: ((internalValue: string) => any) | undefined;
      onSubmit?: ((internalValue: string) => any) | undefined;
      onTrigger?:
        | ((value: import("./types.d.ts").TriggerEvent) => any)
        | undefined;
      "onUpdate:modelValue"?: ((value: string) => any) | undefined;
      onRecordingChange?: ((isRecording: boolean) => any) | undefined;
      onPasteFile?: ((firstFile: File, fileList: FileList) => any) | undefined;
      "onUpdate:triggerPopoverVisible"?:
        | ((visible: boolean) => any)
        | undefined;
    }>,
  {
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
    triggerStrings: string[];
    triggerPopoverPlacement:
      | "top"
      | "top-start"
      | "top-end"
      | "bottom"
      | "bottom-start"
      | "bottom-end"
      | "left"
      | "left-start"
      | "left-end"
      | "right"
      | "right-start"
      | "right-end";
    triggerPopoverOffset: number;
    triggerPopoverVisible: boolean;
    triggerPopoverWidth: string;
    triggerPopoverLeft: string;
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
    popoverRef: unknown;
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
