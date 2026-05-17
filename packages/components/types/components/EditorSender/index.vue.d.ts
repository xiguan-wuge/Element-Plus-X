import { SenderProps } from './types.d.ts';
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
        contentRef: HTMLDivElement;
        inputRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('../EditorInput/types').EditorInputProps> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
            onCompositionend?: ((...args: any[]) => any) | undefined;
            onCompositionstart?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onHandleBlur?: ((...args: any[]) => any) | undefined;
            onHandleFocus?: ((...args: any[]) => any) | undefined;
        }>, {
            focus: (e: Event) => void;
            blur: (e: Event) => void;
            select: () => void;
            clear: () => void;
            selectAll: () => void;
            moveToStart: () => void;
            moveToEnd: () => void;
            editableElement: globalThis.Ref<HTMLElement | null, HTMLElement | null>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
            compositionend: (...args: any[]) => void;
            compositionstart: (...args: any[]) => void;
            keydown: (...args: any[]) => void;
            handleBlur: (...args: any[]) => void;
            handleFocus: (...args: any[]) => void;
        }, import('vue').PublicProps, {
            disabled: boolean;
            placeholder: string;
            modelValue: string;
            autosize: boolean | {
                minRows?: number;
                maxRows?: number;
            };
            rows: number;
            readOnly: boolean;
            submitType: "enter" | "shiftEnter";
        }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
            editableElement: HTMLDivElement;
        }, HTMLDivElement, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('../EditorInput/types').EditorInputProps> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
            onCompositionend?: ((...args: any[]) => any) | undefined;
            onCompositionstart?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onHandleBlur?: ((...args: any[]) => any) | undefined;
            onHandleFocus?: ((...args: any[]) => any) | undefined;
        }>, {
            focus: (e: Event) => void;
            blur: (e: Event) => void;
            select: () => void;
            clear: () => void;
            selectAll: () => void;
            moveToStart: () => void;
            moveToEnd: () => void;
            editableElement: globalThis.Ref<HTMLElement | null, HTMLElement | null>;
        }, {}, {}, {}, {
            disabled: boolean;
            placeholder: string;
            modelValue: string;
            autosize: boolean | {
                minRows?: number;
                maxRows?: number;
            };
            rows: number;
            readOnly: boolean;
            submitType: "enter" | "shiftEnter";
        }> | null;
        popoverRef: unknown;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<SenderProps, {
    openHeader: typeof openHeader;
    closeHeader: typeof closeHeader;
    clear: typeof clear;
    blur: typeof blur;
    focus: typeof focus;
    submit: typeof submit;
    cancel: typeof cancel;
    startRecognition: typeof startRecognition;
    stopRecognition: typeof stopRecognition;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    submit: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    cancel: (...args: any[]) => void;
    trigger: (...args: any[]) => void;
    "update:triggerPopoverVisible": (...args: any[]) => void;
    recordingChange: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<SenderProps> & Readonly<{
    onSubmit?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onTrigger?: ((...args: any[]) => any) | undefined;
    "onUpdate:triggerPopoverVisible"?: ((...args: any[]) => any) | undefined;
    onRecordingChange?: ((...args: any[]) => any) | undefined;
}>, {
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
    triggerStrings: string[];
    triggerPopoverVisible: boolean;
    triggerPopoverWidth: string;
    triggerPopoverLeft: string;
    triggerPopoverOffset: number;
    triggerPopoverPlacement: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    senderRef: HTMLDivElement;
    contentRef: HTMLDivElement;
    inputRef: import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('../EditorInput/types').EditorInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        onCompositionend?: ((...args: any[]) => any) | undefined;
        onCompositionstart?: ((...args: any[]) => any) | undefined;
        onKeydown?: ((...args: any[]) => any) | undefined;
        onHandleBlur?: ((...args: any[]) => any) | undefined;
        onHandleFocus?: ((...args: any[]) => any) | undefined;
    }>, {
        focus: (e: Event) => void;
        blur: (e: Event) => void;
        select: () => void;
        clear: () => void;
        selectAll: () => void;
        moveToStart: () => void;
        moveToEnd: () => void;
        editableElement: globalThis.Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
        compositionend: (...args: any[]) => void;
        compositionstart: (...args: any[]) => void;
        keydown: (...args: any[]) => void;
        handleBlur: (...args: any[]) => void;
        handleFocus: (...args: any[]) => void;
    }, import('vue').PublicProps, {
        disabled: boolean;
        placeholder: string;
        modelValue: string;
        autosize: boolean | {
            minRows?: number;
            maxRows?: number;
        };
        rows: number;
        readOnly: boolean;
        submitType: "enter" | "shiftEnter";
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        editableElement: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('../EditorInput/types').EditorInputProps> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        onCompositionend?: ((...args: any[]) => any) | undefined;
        onCompositionstart?: ((...args: any[]) => any) | undefined;
        onKeydown?: ((...args: any[]) => any) | undefined;
        onHandleBlur?: ((...args: any[]) => any) | undefined;
        onHandleFocus?: ((...args: any[]) => any) | undefined;
    }>, {
        focus: (e: Event) => void;
        blur: (e: Event) => void;
        select: () => void;
        clear: () => void;
        selectAll: () => void;
        moveToStart: () => void;
        moveToEnd: () => void;
        editableElement: globalThis.Ref<HTMLElement | null, HTMLElement | null>;
    }, {}, {}, {}, {
        disabled: boolean;
        placeholder: string;
        modelValue: string;
        autosize: boolean | {
            minRows?: number;
            maxRows?: number;
        };
        rows: number;
        readOnly: boolean;
        submitType: "enter" | "shiftEnter";
    }> | null;
    popoverRef: unknown;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
