import { nextTick } from 'vue';
import { AISearchProps, SearchResult } from './types';
declare function focus(): void;
declare function clear(): void;
declare function setLoading(_loading: boolean): void;
declare function updateResults(results: SearchResult[]): void;
declare function scrollToTop(): void;
declare function scrollToBottom(): void;
declare const _default: import('vue').DefineComponent<AISearchProps, {
    focus: typeof focus;
    clear: typeof clear;
    setLoading: typeof setLoading;
    updateResults: typeof updateResults;
    scrollToTop: typeof scrollToTop;
    scrollToBottom: typeof scrollToBottom;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    search: (...args: any[]) => void;
    clear: (...args: any[]) => void;
    "result-click": (...args: any[]) => void;
    "file-upload": (...args: any[]) => void;
    "file-remove": (...args: any[]) => void;
    "update:results": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<AISearchProps> & Readonly<{
    onSearch?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onResult-click"?: ((...args: any[]) => any) | undefined;
    "onFile-upload"?: ((...args: any[]) => any) | undefined;
    "onFile-remove"?: ((...args: any[]) => any) | undefined;
    "onUpdate:results"?: ((...args: any[]) => any) | undefined;
}>, {
    loading: boolean;
    disabled: boolean;
    maxHeight: string;
    placeholder: string;
    clearable: boolean;
    results: SearchResult[];
    displayMode: "dropdown" | "flat";
    allowFileUpload: boolean;
    acceptFileTypes: string;
    maxFileSize: number;
    maxFileCount: number;
    resultMaxWidth: string;
    inputWidth: string;
    autoFocus: boolean;
    debounceTime: number;
    minSearchLength: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    inputRef: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            readonly disabled: boolean;
            readonly id: string;
            readonly type: string;
            readonly modelValue: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
            readonly tabindex: import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
            readonly readonly: boolean;
            readonly autosize: import('element-plus').InputAutoSize;
            readonly autocomplete: string;
            readonly containerRole: string;
            readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
            readonly inputStyle: import('vue').StyleValue;
            readonly rows: number;
            readonly clearable: boolean;
            readonly showPassword: boolean;
            readonly showWordLimit: boolean;
            readonly autofocus: boolean;
        }> & Omit<{
            readonly type: string;
            readonly disabled: boolean;
            readonly clearable: boolean;
            readonly inputStyle: import('vue').StyleValue;
            readonly modelValue: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
            readonly autosize: import('element-plus').InputAutoSize;
            readonly autocomplete: string;
            readonly readonly: boolean;
            readonly showPassword: boolean;
            readonly showWordLimit: boolean;
            readonly tabindex: import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
            readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
            readonly autofocus: boolean;
            readonly rows: number;
            readonly size?: import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never> | undefined;
            readonly form?: string | undefined;
            readonly resize?: import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "none" | "vertical" | "both" | "horizontal", unknown> | undefined;
            readonly id?: string | undefined;
            readonly placeholder?: string | undefined;
            readonly ariaLabel?: string | undefined;
            readonly maxlength?: import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined;
            readonly minlength?: import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown> | undefined;
            readonly formatter?: Function | undefined;
            readonly parser?: Function | undefined;
            readonly suffixIcon?: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component) | ((new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component))[], unknown, unknown> | undefined;
            readonly prefixIcon?: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component) | ((new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component))[], unknown, unknown> | undefined;
            readonly containerRole?: string | undefined;
            "onUpdate:modelValue"?: ((value: string) => any) | undefined | undefined;
            onChange?: ((value: string) => any) | undefined | undefined;
            onCompositionend?: ((evt: CompositionEvent) => any) | undefined | undefined;
            onCompositionstart?: ((evt: CompositionEvent) => any) | undefined | undefined;
            onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined | undefined;
            onFocus?: ((evt: FocusEvent) => any) | undefined | undefined;
            onBlur?: ((evt: FocusEvent) => any) | undefined | undefined;
            onInput?: ((value: string) => any) | undefined | undefined;
            onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined | undefined;
            onMouseenter?: ((evt: MouseEvent) => any) | undefined | undefined;
            onMouseleave?: ((evt: MouseEvent) => any) | undefined | undefined;
            onClear?: (() => any) | undefined | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "type" | "disabled" | "id" | "clearable" | "inputStyle" | "modelValue" | "autosize" | "autocomplete" | "readonly" | "showPassword" | "showWordLimit" | "containerRole" | "tabindex" | "validateEvent" | "autofocus" | "rows">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: globalThis.Slot | undefined;
        }>;
        $root: ComponentPublicInstance | null;
        $parent: ComponentPublicInstance | null;
        $host: Element | null;
        $emit: ((event: "clear") => void) & ((event: "input", value: string) => void) & ((event: "focus", evt: FocusEvent) => void) & ((event: "blur", evt: FocusEvent) => void) & ((event: "update:modelValue", value: string) => void) & ((event: "change", value: string) => void) & ((event: "compositionend", evt: CompositionEvent) => void) & ((event: "compositionstart", evt: CompositionEvent) => void) & ((event: "compositionupdate", evt: CompositionEvent) => void) & ((event: "keydown", evt: Event | KeyboardEvent) => void) & ((event: "mouseenter", evt: MouseEvent) => void) & ((event: "mouseleave", evt: MouseEvent) => void);
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<globalThis.ExtractPropTypes<{
            readonly ariaLabel: StringConstructor;
            readonly id: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
            readonly size: {
                readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly disabled: BooleanConstructor;
            readonly modelValue: import('element-plus/es/utils/index.mjs').EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown, "", boolean>;
            readonly maxlength: {
                readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly minlength: {
                readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly type: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, "text", boolean>;
            readonly resize: {
                readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "none" | "both" | "horizontal" | "vertical", unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly autosize: import('element-plus/es/utils/index.mjs').EpPropFinalized<(new (...args: any[]) => boolean | {
                minRows?: number;
                maxRows?: number;
            }) | (() => import('element-plus').InputAutoSize) | ((new (...args: any[]) => boolean | {
                minRows?: number;
                maxRows?: number;
            }) | (() => import('element-plus').InputAutoSize))[], unknown, unknown, false, boolean>;
            readonly autocomplete: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, "off", boolean>;
            readonly formatter: {
                readonly type: import('vue').PropType<Function>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly parser: {
                readonly type: import('vue').PropType<Function>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly placeholder: {
                readonly type: import('vue').PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly form: {
                readonly type: import('vue').PropType<string>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly readonly: BooleanConstructor;
            readonly clearable: BooleanConstructor;
            readonly showPassword: BooleanConstructor;
            readonly showWordLimit: BooleanConstructor;
            readonly suffixIcon: {
                readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component) | ((new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly prefixIcon: {
                readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component) | ((new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component))[], unknown, unknown>>;
                readonly required: false;
                readonly validator: ((val: unknown) => boolean) | undefined;
                __epPropKey: true;
            };
            readonly containerRole: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
            readonly tabindex: import('element-plus/es/utils/index.mjs').EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
            readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
            readonly inputStyle: import('element-plus/es/utils/index.mjs').EpPropFinalized<(new (...args: any[]) => string | import('vue').CSSProperties | import('vue').StyleValue[]) | (() => import('vue').StyleValue) | ((new (...args: any[]) => string | import('vue').CSSProperties | import('vue').StyleValue[]) | (() => import('vue').StyleValue))[], unknown, unknown, () => import('element-plus/es/utils/typescript.mjs').Mutable<{}>, boolean>;
            readonly autofocus: BooleanConstructor;
            readonly rows: import('element-plus/es/utils/index.mjs').EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
        }>> & {
            "onUpdate:modelValue"?: ((value: string) => any) | undefined;
            onChange?: ((value: string) => any) | undefined;
            onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
            onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
            onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
            onFocus?: ((evt: FocusEvent) => any) | undefined;
            onBlur?: ((evt: FocusEvent) => any) | undefined;
            onInput?: ((value: string) => any) | undefined;
            onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
            onMouseenter?: ((evt: MouseEvent) => any) | undefined;
            onMouseleave?: ((evt: MouseEvent) => any) | undefined;
            onClear?: (() => any) | undefined;
        }, {
            input: import('vue').ShallowRef<HTMLInputElement | undefined>;
            textarea: import('vue').ShallowRef<HTMLTextAreaElement | undefined>;
            ref: import('vue').ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>;
            textareaStyle: import('vue').ComputedRef<import('vue').StyleValue>;
            autosize: import('vue').Ref<import('element-plus').InputAutoSize>;
            isComposing: import('vue').Ref<boolean>;
            focus: () => void | undefined;
            blur: () => void | undefined;
            select: () => void;
            clear: () => void;
            resizeTextarea: () => void;
        }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            input: (value: string) => void;
            clear: () => void;
            "update:modelValue": (value: string) => void;
            change: (value: string) => void;
            blur: (evt: FocusEvent) => void;
            compositionend: (evt: CompositionEvent) => void;
            compositionstart: (evt: CompositionEvent) => void;
            compositionupdate: (evt: CompositionEvent) => void;
            focus: (evt: FocusEvent) => void;
            keydown: (evt: Event | KeyboardEvent) => void;
            mouseenter: (evt: MouseEvent) => void;
            mouseleave: (evt: MouseEvent) => void;
        }, string, {
            readonly disabled: boolean;
            readonly id: string;
            readonly type: string;
            readonly modelValue: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
            readonly tabindex: import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
            readonly readonly: boolean;
            readonly autosize: import('element-plus').InputAutoSize;
            readonly autocomplete: string;
            readonly containerRole: string;
            readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
            readonly inputStyle: import('vue').StyleValue;
            readonly rows: number;
            readonly clearable: boolean;
            readonly showPassword: boolean;
            readonly showWordLimit: boolean;
            readonly autofocus: boolean;
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
        $nextTick: typeof nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        readonly disabled: boolean;
        readonly id: string;
        readonly type: string;
        readonly modelValue: import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>;
        readonly tabindex: import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
        readonly readonly: boolean;
        readonly autosize: import('element-plus').InputAutoSize;
        readonly autocomplete: string;
        readonly containerRole: string;
        readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropMergeType<BooleanConstructor, unknown, unknown>;
        readonly inputStyle: import('vue').StyleValue;
        readonly rows: number;
        readonly clearable: boolean;
        readonly showPassword: boolean;
        readonly showWordLimit: boolean;
        readonly autofocus: boolean;
    }> & Omit<Readonly<globalThis.ExtractPropTypes<{
        readonly ariaLabel: StringConstructor;
        readonly id: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
        readonly size: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "" | "small" | "default" | "large", never>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly disabled: BooleanConstructor;
        readonly modelValue: import('element-plus/es/utils/index.mjs').EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown, "", boolean>;
        readonly maxlength: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly minlength: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly type: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, "text", boolean>;
        readonly resize: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<StringConstructor, "none" | "both" | "horizontal" | "vertical", unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly autosize: import('element-plus/es/utils/index.mjs').EpPropFinalized<(new (...args: any[]) => boolean | {
            minRows?: number;
            maxRows?: number;
        }) | (() => import('element-plus').InputAutoSize) | ((new (...args: any[]) => boolean | {
            minRows?: number;
            maxRows?: number;
        }) | (() => import('element-plus').InputAutoSize))[], unknown, unknown, false, boolean>;
        readonly autocomplete: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, "off", boolean>;
        readonly formatter: {
            readonly type: import('vue').PropType<Function>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly parser: {
            readonly type: import('vue').PropType<Function>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly placeholder: {
            readonly type: import('vue').PropType<string>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly form: {
            readonly type: import('vue').PropType<string>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly readonly: BooleanConstructor;
        readonly clearable: BooleanConstructor;
        readonly showPassword: BooleanConstructor;
        readonly showWordLimit: BooleanConstructor;
        readonly suffixIcon: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component) | ((new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly prefixIcon: {
            readonly type: import('vue').PropType<import('element-plus/es/utils/index.mjs').EpPropMergeType<(new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component) | ((new (...args: any[]) => (string | import('vue').Component) & {}) | (() => string | import('vue').Component))[], unknown, unknown>>;
            readonly required: false;
            readonly validator: ((val: unknown) => boolean) | undefined;
            __epPropKey: true;
        };
        readonly containerRole: import('element-plus/es/utils/index.mjs').EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
        readonly tabindex: import('element-plus/es/utils/index.mjs').EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
        readonly validateEvent: import('element-plus/es/utils/index.mjs').EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
        readonly inputStyle: import('element-plus/es/utils/index.mjs').EpPropFinalized<(new (...args: any[]) => string | import('vue').CSSProperties | import('vue').StyleValue[]) | (() => import('vue').StyleValue) | ((new (...args: any[]) => string | import('vue').CSSProperties | import('vue').StyleValue[]) | (() => import('vue').StyleValue))[], unknown, unknown, () => import('element-plus/es/utils/typescript.mjs').Mutable<{}>, boolean>;
        readonly autofocus: BooleanConstructor;
        readonly rows: import('element-plus/es/utils/index.mjs').EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
    }>> & {
        "onUpdate:modelValue"?: ((value: string) => any) | undefined;
        onChange?: ((value: string) => any) | undefined;
        onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
        onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
        onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
        onFocus?: ((evt: FocusEvent) => any) | undefined;
        onBlur?: ((evt: FocusEvent) => any) | undefined;
        onInput?: ((value: string) => any) | undefined;
        onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
        onMouseenter?: ((evt: MouseEvent) => any) | undefined;
        onMouseleave?: ((evt: MouseEvent) => any) | undefined;
        onClear?: (() => any) | undefined;
    }, "ref" | "clear" | "input" | "select" | "textarea" | "type" | "disabled" | "id" | "clearable" | "inputStyle" | "focus" | "modelValue" | "autosize" | "autocomplete" | "readonly" | "showPassword" | "showWordLimit" | "containerRole" | "tabindex" | "validateEvent" | "autofocus" | "rows" | "textareaStyle" | "isComposing" | "blur" | "resizeTextarea"> & import('vue').ShallowUnwrapRef<{
        input: import('vue').ShallowRef<HTMLInputElement | undefined>;
        textarea: import('vue').ShallowRef<HTMLTextAreaElement | undefined>;
        ref: import('vue').ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>;
        textareaStyle: import('vue').ComputedRef<import('vue').StyleValue>;
        autosize: import('vue').Ref<import('element-plus').InputAutoSize>;
        isComposing: import('vue').Ref<boolean>;
        focus: () => void | undefined;
        blur: () => void | undefined;
        select: () => void;
        clear: () => void;
        resizeTextarea: () => void;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: {
            prepend?(_: {}): any;
            prefix?(_: {}): any;
            suffix?(_: {}): any;
            append?(_: {}): any;
        };
    }) | null;
    bubbleListRef: import('vue').ShallowUnwrapRef<{
        scrollToTop: () => void;
        scrollToBottom: () => void;
        scrollToBubble: (index: number) => void;
    }> | null;
}, HTMLDivElement>;
export default _default;
