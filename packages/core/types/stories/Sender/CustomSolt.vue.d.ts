import { TriggerEvent } from "../../components/Sender/types.d.ts";
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
            readonly triggerStrings?: string[] | undefined;
            readonly triggerPopoverVisible?: boolean | undefined;
            readonly triggerPopoverWidth?: string | undefined;
            readonly triggerPopoverLeft?: string | undefined;
            readonly triggerPopoverOffset?: number | undefined;
            readonly triggerPopoverPlacement?:
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
              | "right-end"
              | undefined;
            readonly onCancel?: ((internalValue: string) => any) | undefined;
            readonly onSubmit?: ((internalValue: string) => any) | undefined;
            readonly onTrigger?: ((value: TriggerEvent) => any) | undefined;
            readonly "onUpdate:modelValue"?:
              | ((value: string) => any)
              | undefined;
            readonly onRecordingChange?:
              | ((isRecording: boolean) => any)
              | undefined;
            readonly onPasteFile?:
              | ((firstFile: File, fileList: FileList) => any)
              | undefined;
            readonly "onUpdate:triggerPopoverVisible"?:
              | ((visible: boolean) => any)
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
            popoverRef: unknown;
          };
          $slots: Readonly<{
            [name: string]: globalThis.Slot | undefined;
          }>;
          $root: ComponentPublicInstance | null;
          $parent: ComponentPublicInstance | null;
          $host: Element | null;
          $emit: ((event: "cancel", internalValue: string) => void) &
            ((event: "submit", internalValue: string) => void) &
            ((event: "trigger", value: TriggerEvent) => void) &
            ((event: "update:modelValue", value: string) => void) &
            ((event: "recordingChange", isRecording: boolean) => void) &
            ((
              event: "pasteFile",
              firstFile: File,
              fileList: FileList,
            ) => void) &
            ((event: "update:triggerPopoverVisible", visible: boolean) => void);
          $el: HTMLDivElement;
          $options: import("vue").ComponentOptionsBase<
            Readonly<import("../../components/Sender/types.d.ts").SenderProps> &
              Readonly<{
                onCancel?: ((internalValue: string) => any) | undefined;
                onSubmit?: ((internalValue: string) => any) | undefined;
                onTrigger?: ((value: TriggerEvent) => any) | undefined;
                "onUpdate:modelValue"?: ((value: string) => any) | undefined;
                onRecordingChange?: ((isRecording: boolean) => any) | undefined;
                onPasteFile?:
                  | ((firstFile: File, fileList: FileList) => any)
                  | undefined;
                "onUpdate:triggerPopoverVisible"?:
                  | ((visible: boolean) => any)
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
              trigger: (value: TriggerEvent) => any;
              "update:modelValue": (value: string) => any;
              recordingChange: (isRecording: boolean) => any;
              pasteFile: (firstFile: File, fileList: FileList) => any;
              "update:triggerPopoverVisible": (visible: boolean) => any;
            },
            string,
            {
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
        }> &
          Omit<
            Readonly<import("../../components/Sender/types.d.ts").SenderProps> &
              Readonly<{
                onCancel?: ((internalValue: string) => any) | undefined;
                onSubmit?: ((internalValue: string) => any) | undefined;
                onTrigger?: ((value: TriggerEvent) => any) | undefined;
                "onUpdate:modelValue"?: ((value: string) => any) | undefined;
                onRecordingChange?: ((isRecording: boolean) => any) | undefined;
                onPasteFile?:
                  | ((firstFile: File, fileList: FileList) => any)
                  | undefined;
                "onUpdate:triggerPopoverVisible"?:
                  | ((visible: boolean) => any)
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
                | "triggerStrings"
                | "triggerPopoverPlacement"
                | "triggerPopoverOffset"
                | "triggerPopoverVisible"
                | "triggerPopoverWidth"
                | "triggerPopoverLeft"
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
            popoverVisible: globalThis.WritableComputedRef<boolean, boolean>;
            inputInstance: globalThis.ComputedRef<any>;
          }> & {} & import("vue").ComponentCustomProperties & {} & {
            $slots: Readonly<Record<string, any>> & Record<string, any>;
          })
      | null;
  },
  HTMLDivElement
>;
export default _default;
