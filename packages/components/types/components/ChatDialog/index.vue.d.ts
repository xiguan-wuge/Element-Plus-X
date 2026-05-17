import { BubbleListItemProps } from '../BubbleList/types';
import { ChatDialogProps, ChatMessage } from './types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'message-header'?(_: {
            item: BubbleListItemProps & ChatMessage;
        }): any;
        'message-content'?(_: {
            item: BubbleListItemProps & ChatMessage;
        }): any;
        'message-footer'?(_: {
            item: BubbleListItemProps & ChatMessage;
        }): any;
        'message-loading'?(_: {
            item: BubbleListItemProps & ChatMessage;
        }): any;
        'input-header'?(_: {}): any;
        'input-prefix'?(_: {}): any;
        'input-actions'?(_: {}): any;
    };
    refs: {
        bubbleListRef: import('vue').ShallowUnwrapRef<{
            scrollToTop: () => void;
            scrollToBottom: () => void;
            scrollToBubble: (index: number) => void;
        }> | null;
        senderRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly modelValue?: string | undefined;
                readonly placeholder?: string | undefined;
                readonly autoSize?: {
                    minRows: number;
                    maxRows: number;
                } | undefined;
                readonly readOnly?: boolean | undefined;
                readonly disabled?: boolean | undefined;
                readonly loading?: boolean | undefined;
                readonly clearable?: boolean | undefined;
                readonly allowSpeech?: boolean | undefined;
                readonly submitType?: "enter" | "shiftEnter" | undefined;
                readonly headerAnimationTimer?: number | undefined;
                readonly inputWidth?: string | undefined;
                readonly variant?: "default" | "updown" | undefined;
                readonly showUpdown?: boolean | undefined;
                readonly submitBtnDisabled?: boolean | undefined;
                readonly inputStyle?: string | CSSProperties | CSSProperties[] | string[];
                readonly triggerStrings?: string[] | undefined;
                readonly triggerPopoverVisible?: boolean | undefined;
                readonly triggerPopoverWidth?: string | undefined;
                readonly triggerPopoverLeft?: string | undefined;
                readonly triggerPopoverOffset?: number | undefined;
                readonly triggerPopoverPlacement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end" | undefined;
                readonly onSubmit?: ((...args: any[]) => any) | undefined;
                readonly "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                readonly onCancel?: ((...args: any[]) => any) | undefined;
                readonly onTrigger?: ((...args: any[]) => any) | undefined;
                readonly "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
                readonly onRecordingChange?: ((...args: any[]) => any) | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
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
            $emit: ((event: "submit", ...args: any[]) => void) & ((event: "update:modelValue", ...args: any[]) => void) & ((event: "cancel", ...args: any[]) => void) & ((event: "trigger", ...args: any[]) => void) & ((event: "update:triggerPopoverVisible", ...args: any[]) => void) & ((event: "recordingChange", ...args: any[]) => void);
            $el: HTMLDivElement;
            $options: import('vue').ComponentOptionsBase<Readonly<import('../Sender/types').SenderProps> & Readonly<{
                onSubmit?: ((...args: any[]) => any) | undefined;
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                onCancel?: ((...args: any[]) => any) | undefined;
                onTrigger?: ((...args: any[]) => any) | undefined;
                "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
                onRecordingChange?: ((...args: any[]) => any) | undefined;
            }>, {
                openHeader: () => false | undefined;
                closeHeader: () => void;
                clear: () => void;
                blur: () => false | undefined;
                focus: (type?: string) => false | undefined;
                submit: () => void;
                cancel: () => void;
                startRecognition: () => void;
                stopRecognition: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                submit: (...args: any[]) => void;
                "update:modelValue": (...args: any[]) => void;
                cancel: (...args: any[]) => void;
                trigger: (...args: any[]) => void;
                "update:triggerPopoverVisible": (...args: any[]) => void;
                recordingChange: (...args: any[]) => void;
            }, string, {
                variant: "default" | "updown";
                placeholder: string;
                inputWidth: string;
                inputStyle: string | CSSProperties | CSSProperties[] | string[];
                modelValue: string;
                autoSize: {
                    minRows: number;
                    maxRows: number;
                };
                submitType: "enter" | "shiftEnter";
                headerAnimationTimer: number;
                showUpdown: boolean;
                submitBtnDisabled: boolean;
                triggerStrings: string[];
                triggerPopoverVisible: boolean;
                triggerPopoverWidth: string;
                triggerPopoverLeft: string;
                triggerPopoverOffset: number;
                triggerPopoverPlacement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
            }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
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
                renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                errorCaptured?: ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void)[];
            };
            $forceUpdate: () => void;
            $nextTick: typeof import('vue').nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            variant: "default" | "updown";
            placeholder: string;
            inputWidth: string;
            inputStyle: string | CSSProperties | CSSProperties[] | string[];
            modelValue: string;
            autoSize: {
                minRows: number;
                maxRows: number;
            };
            submitType: "enter" | "shiftEnter";
            headerAnimationTimer: number;
            showUpdown: boolean;
            submitBtnDisabled: boolean;
            triggerStrings: string[];
            triggerPopoverVisible: boolean;
            triggerPopoverWidth: string;
            triggerPopoverLeft: string;
            triggerPopoverOffset: number;
            triggerPopoverPlacement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
        }> & Omit<Readonly<import('../Sender/types').SenderProps> & Readonly<{
            onSubmit?: ((...args: any[]) => any) | undefined;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onCancel?: ((...args: any[]) => any) | undefined;
            onTrigger?: ((...args: any[]) => any) | undefined;
            "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
            onRecordingChange?: ((...args: any[]) => any) | undefined;
        }>, "clear" | "focus" | "blur" | "submit" | "cancel" | "openHeader" | "closeHeader" | "startRecognition" | "stopRecognition" | ("variant" | "placeholder" | "inputWidth" | "inputStyle" | "modelValue" | "autoSize" | "submitType" | "headerAnimationTimer" | "showUpdown" | "submitBtnDisabled" | "triggerStrings" | "triggerPopoverVisible" | "triggerPopoverWidth" | "triggerPopoverLeft" | "triggerPopoverOffset" | "triggerPopoverPlacement")> & import('vue').ShallowUnwrapRef<{
            openHeader: () => false | undefined;
            closeHeader: () => void;
            clear: () => void;
            blur: () => false | undefined;
            focus: (type?: string) => false | undefined;
            submit: () => void;
            cancel: () => void;
            startRecognition: () => void;
            stopRecognition: () => void;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: Readonly<Record<string, any>> & Record<string, any>;
        }) | null;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ChatDialogProps, {
    addAIResponse: (content: string, options?: Partial<ChatMessage>) => void;
    setMessageLoading: (messageId: string, loading: boolean) => void;
    updateMessage: (messageId: string, content: string) => void;
    scrollToTop: () => any;
    scrollToBottom: () => any;
    scrollToMessage: (index: number) => any;
    clear: () => void;
    focus: () => any;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: () => any;
    send: (message: string) => any;
    "update:messages": (messages: ChatMessage[]) => any;
    messageComplete: (instance: any, index: number) => any;
    copyMessage: (message: ChatMessage) => any;
    deleteMessage: (message: ChatMessage) => any;
}, string, import('vue').PublicProps, Readonly<ChatDialogProps> & Readonly<{
    onClear?: (() => any) | undefined;
    onSend?: ((message: string) => any) | undefined;
    "onUpdate:messages"?: ((messages: ChatMessage[]) => any) | undefined;
    onMessageComplete?: ((instance: any, index: number) => any) | undefined;
    onCopyMessage?: ((message: ChatMessage) => any) | undefined;
    onDeleteMessage?: ((message: ChatMessage) => any) | undefined;
}>, {
    loading: boolean;
    disabled: boolean;
    maxHeight: string;
    placeholder: string;
    clearable: boolean;
    allowSpeech: boolean;
    messages: ChatMessage[];
    autoScroll: boolean;
    showAvatar: boolean;
    userAvatar: string;
    aiAvatar: string;
    userAvatarSize: number;
    aiAvatarSize: number;
    bubbleMaxWidth: string;
    typingSpeed: number;
    showTypingEffect: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    bubbleListRef: import('vue').ShallowUnwrapRef<{
        scrollToTop: () => void;
        scrollToBottom: () => void;
        scrollToBubble: (index: number) => void;
    }> | null;
    senderRef: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly modelValue?: string | undefined;
            readonly placeholder?: string | undefined;
            readonly autoSize?: {
                minRows: number;
                maxRows: number;
            } | undefined;
            readonly readOnly?: boolean | undefined;
            readonly disabled?: boolean | undefined;
            readonly loading?: boolean | undefined;
            readonly clearable?: boolean | undefined;
            readonly allowSpeech?: boolean | undefined;
            readonly submitType?: "enter" | "shiftEnter" | undefined;
            readonly headerAnimationTimer?: number | undefined;
            readonly inputWidth?: string | undefined;
            readonly variant?: "default" | "updown" | undefined;
            readonly showUpdown?: boolean | undefined;
            readonly submitBtnDisabled?: boolean | undefined;
            readonly inputStyle?: string | CSSProperties | CSSProperties[] | string[];
            readonly triggerStrings?: string[] | undefined;
            readonly triggerPopoverVisible?: boolean | undefined;
            readonly triggerPopoverWidth?: string | undefined;
            readonly triggerPopoverLeft?: string | undefined;
            readonly triggerPopoverOffset?: number | undefined;
            readonly triggerPopoverPlacement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end" | undefined;
            readonly onSubmit?: ((...args: any[]) => any) | undefined;
            readonly "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            readonly onCancel?: ((...args: any[]) => any) | undefined;
            readonly onTrigger?: ((...args: any[]) => any) | undefined;
            readonly "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
            readonly onRecordingChange?: ((...args: any[]) => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
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
        $emit: ((event: "submit", ...args: any[]) => void) & ((event: "update:modelValue", ...args: any[]) => void) & ((event: "cancel", ...args: any[]) => void) & ((event: "trigger", ...args: any[]) => void) & ((event: "update:triggerPopoverVisible", ...args: any[]) => void) & ((event: "recordingChange", ...args: any[]) => void);
        $el: HTMLDivElement;
        $options: import('vue').ComponentOptionsBase<Readonly<import('../Sender/types').SenderProps> & Readonly<{
            onSubmit?: ((...args: any[]) => any) | undefined;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onCancel?: ((...args: any[]) => any) | undefined;
            onTrigger?: ((...args: any[]) => any) | undefined;
            "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
            onRecordingChange?: ((...args: any[]) => any) | undefined;
        }>, {
            openHeader: () => false | undefined;
            closeHeader: () => void;
            clear: () => void;
            blur: () => false | undefined;
            focus: (type?: string) => false | undefined;
            submit: () => void;
            cancel: () => void;
            startRecognition: () => void;
            stopRecognition: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            submit: (...args: any[]) => void;
            "update:modelValue": (...args: any[]) => void;
            cancel: (...args: any[]) => void;
            trigger: (...args: any[]) => void;
            "update:triggerPopoverVisible": (...args: any[]) => void;
            recordingChange: (...args: any[]) => void;
        }, string, {
            variant: "default" | "updown";
            placeholder: string;
            inputWidth: string;
            inputStyle: string | CSSProperties | CSSProperties[] | string[];
            modelValue: string;
            autoSize: {
                minRows: number;
                maxRows: number;
            };
            submitType: "enter" | "shiftEnter";
            headerAnimationTimer: number;
            showUpdown: boolean;
            submitBtnDisabled: boolean;
            triggerStrings: string[];
            triggerPopoverVisible: boolean;
            triggerPopoverWidth: string;
            triggerPopoverLeft: string;
            triggerPopoverOffset: number;
            triggerPopoverPlacement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
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
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        variant: "default" | "updown";
        placeholder: string;
        inputWidth: string;
        inputStyle: string | CSSProperties | CSSProperties[] | string[];
        modelValue: string;
        autoSize: {
            minRows: number;
            maxRows: number;
        };
        submitType: "enter" | "shiftEnter";
        headerAnimationTimer: number;
        showUpdown: boolean;
        submitBtnDisabled: boolean;
        triggerStrings: string[];
        triggerPopoverVisible: boolean;
        triggerPopoverWidth: string;
        triggerPopoverLeft: string;
        triggerPopoverOffset: number;
        triggerPopoverPlacement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
    }> & Omit<Readonly<import('../Sender/types').SenderProps> & Readonly<{
        onSubmit?: ((...args: any[]) => any) | undefined;
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onCancel?: ((...args: any[]) => any) | undefined;
        onTrigger?: ((...args: any[]) => any) | undefined;
        "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
        onRecordingChange?: ((...args: any[]) => any) | undefined;
    }>, "clear" | "focus" | "blur" | "submit" | "cancel" | "openHeader" | "closeHeader" | "startRecognition" | "stopRecognition" | ("variant" | "placeholder" | "inputWidth" | "inputStyle" | "modelValue" | "autoSize" | "submitType" | "headerAnimationTimer" | "showUpdown" | "submitBtnDisabled" | "triggerStrings" | "triggerPopoverVisible" | "triggerPopoverWidth" | "triggerPopoverLeft" | "triggerPopoverOffset" | "triggerPopoverPlacement")> & import('vue').ShallowUnwrapRef<{
        openHeader: () => false | undefined;
        closeHeader: () => void;
        clear: () => void;
        blur: () => false | undefined;
        focus: (type?: string) => false | undefined;
        submit: () => void;
        cancel: () => void;
        startRecognition: () => void;
        stopRecognition: () => void;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: Readonly<Record<string, any>> & Record<string, any>;
    }) | null;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
