import { MentionOption } from "../../components/MentionSender/types.d.ts";
declare const _default: import("vue").DefineComponent<
  {},
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<{}> & Readonly<{}>,
  {},
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  true,
  {
    senderRef:
      | ({
          $: import("vue").ComponentInternalInstance;
          $data: {};
          $props: {
            readonly modelValue?: string | undefined;
            readonly placeholder?: string | undefined;
            readonly autoSize?:
              | {
                  minRows: number;
                  maxRows: number;
                }
              | undefined;
            readonly readOnly?: boolean | undefined;
            readonly disabled?: boolean | undefined;
            readonly loading?: boolean | undefined;
            readonly clearable?: boolean | undefined;
            readonly allowSpeech?: boolean | undefined;
            readonly submitType?:
              | "enter"
              | "shiftEnter"
              | "cmdOrCtrlEnter"
              | "altEnter"
              | undefined;
            readonly headerAnimationTimer?: number | undefined;
            readonly inputWidth?: string | undefined;
            readonly variant?: "default" | "updown" | undefined;
            readonly showUpdown?: boolean | undefined;
            readonly submitBtnDisabled?: boolean | undefined;
            readonly inputStyle?:
              | string
              | CSSProperties
              | CSSProperties[]
              | string[];
            readonly options?: MentionOption[] | undefined;
            readonly filterOption?:
              | ((pattern: string, option: MentionOption) => boolean)
              | undefined;
            readonly whole?: boolean | undefined;
            readonly checkIsWhole?:
              | ((pattern: string, prefix: string) => boolean)
              | undefined;
            readonly triggerLoading?: boolean | undefined;
            readonly triggerStrings?: string[] | undefined;
            readonly triggerSplit?: string | undefined;
            readonly triggerPopoverPlacement?: "bottom" | "top" | undefined;
            readonly triggerPopoverOffset?: number | undefined;
            readonly onSearch?:
              | ((pattern: string, prefix: string) => any)
              | undefined;
            readonly onSelect?:
              | ((option: MentionOption, prefix: string) => any)
              | undefined;
            readonly onCancel?: ((internalValue: string) => any) | undefined;
            readonly onSubmit?: ((internalValue: string) => any) | undefined;
            readonly "onUpdate:modelValue"?:
              | ((value: string) => any)
              | undefined;
            readonly onRecordingChange?:
              | ((isRecording: boolean) => any)
              | undefined;
            readonly onPasteFile?:
              | ((firstFile: File, fileList: FileList) => any)
              | undefined;
          } & import("vue").VNodeProps &
            import("vue").AllowedComponentProps &
            import("vue").ComponentCustomProps;
          $attrs: {
            [x: string]: unknown;
          };
          $refs: {
            [x: string]: unknown;
          } & {
            senderRef: HTMLDivElement;
            inputRef: unknown;
          };
          $slots: Readonly<{
            [name: string]: globalThis.Slot | undefined;
          }>;
          $root: ComponentPublicInstance | null;
          $parent: ComponentPublicInstance | null;
          $host: Element | null;
          $emit: ((event: "search", pattern: string, prefix: string) => void) &
            ((event: "select", option: MentionOption, prefix: string) => void) &
            ((event: "cancel", internalValue: string) => void) &
            ((event: "submit", internalValue: string) => void) &
            ((event: "update:modelValue", value: string) => void) &
            ((event: "recordingChange", isRecording: boolean) => void) &
            ((event: "pasteFile", firstFile: File, fileList: FileList) => void);
          $el: HTMLDivElement;
          $options: import("vue").ComponentOptionsBase<
            Readonly<
              import("../../components/MentionSender/types.d.ts").MentionSenderProps
            > &
              Readonly<{
                onSearch?:
                  | ((pattern: string, prefix: string) => any)
                  | undefined;
                onSelect?:
                  | ((option: MentionOption, prefix: string) => any)
                  | undefined;
                onCancel?: ((internalValue: string) => any) | undefined;
                onSubmit?: ((internalValue: string) => any) | undefined;
                "onUpdate:modelValue"?: ((value: string) => any) | undefined;
                onRecordingChange?: ((isRecording: boolean) => any) | undefined;
                onPasteFile?:
                  | ((firstFile: File, fileList: FileList) => any)
                  | undefined;
              }>,
            {
              openHeader: () => false | undefined;
              closeHeader: () => void;
              clear: () => void;
              blur: () => false | undefined;
              focus: (type?: string) => false | undefined;
              submit: () => void;
              cancel: () => void;
              startRecognition: () => void;
              stopRecognition: () => void;
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
            {
              options: MentionOption[];
              placeholder: string;
              variant: "default" | "updown";
              modelValue: string;
              autoSize: {
                minRows: number;
                maxRows: number;
              };
              submitType:
                | "enter"
                | "shiftEnter"
                | "cmdOrCtrlEnter"
                | "altEnter";
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
            string,
            {},
            import("vue").GlobalComponents,
            import("vue").GlobalDirectives,
            string,
            import("vue").ComponentProvideOptions
          > & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?:
              | ((e: import("vue").DebuggerEvent) => void)
              | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?:
              | ((e: import("vue").DebuggerEvent) => void)
              | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?:
              | ((
                  err: unknown,
                  instance: ComponentPublicInstance | null,
                  info: string,
                ) => boolean | void)
              | ((
                  err: unknown,
                  instance: ComponentPublicInstance | null,
                  info: string,
                ) => boolean | void)[];
          };
          $forceUpdate: () => void;
          $nextTick: typeof import("vue").nextTick;
          $watch<T extends string | ((...args: any) => any)>(
            source: T,
            cb: T extends (...args: any) => infer R
              ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any
              : (
                  ...args: [any, any, import("@vue/reactivity").OnCleanup]
                ) => any,
            options?: import("vue").WatchOptions,
          ): import("vue").WatchStopHandle;
        } & Readonly<{
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
        }> &
          Omit<
            Readonly<
              import("../../components/MentionSender/types.d.ts").MentionSenderProps
            > &
              Readonly<{
                onSearch?:
                  | ((pattern: string, prefix: string) => any)
                  | undefined;
                onSelect?:
                  | ((option: MentionOption, prefix: string) => any)
                  | undefined;
                onCancel?: ((internalValue: string) => any) | undefined;
                onSubmit?: ((internalValue: string) => any) | undefined;
                "onUpdate:modelValue"?: ((value: string) => any) | undefined;
                onRecordingChange?: ((isRecording: boolean) => any) | undefined;
                onPasteFile?:
                  | ((firstFile: File, fileList: FileList) => any)
                  | undefined;
              }>,
            | "blur"
            | "cancel"
            | "focus"
            | "submit"
            | "clear"
            | "openHeader"
            | "closeHeader"
            | "startRecognition"
            | "stopRecognition"
            | "popoverVisible"
            | "inputInstance"
            | (
                | "options"
                | "placeholder"
                | "variant"
                | "modelValue"
                | "autoSize"
                | "submitType"
                | "headerAnimationTimer"
                | "inputWidth"
                | "showUpdown"
                | "submitBtnDisabled"
                | "inputStyle"
                | "filterOption"
                | "whole"
                | "checkIsWhole"
                | "triggerLoading"
                | "triggerStrings"
                | "triggerSplit"
                | "triggerPopoverPlacement"
                | "triggerPopoverOffset"
              )
          > &
          import("vue").ShallowUnwrapRef<{
            openHeader: () => false | undefined;
            closeHeader: () => void;
            clear: () => void;
            blur: () => false | undefined;
            focus: (type?: string) => false | undefined;
            submit: () => void;
            cancel: () => void;
            startRecognition: () => void;
            stopRecognition: () => void;
            popoverVisible: globalThis.ComputedRef<any>;
            inputInstance: globalThis.ComputedRef<any>;
          }> & {} & import("vue").ComponentCustomProperties & {} & {
            $slots: Readonly<Record<string, any>> & Record<string, any>;
          })
      | null;
  },
  HTMLDivElement
>;
export default _default;
