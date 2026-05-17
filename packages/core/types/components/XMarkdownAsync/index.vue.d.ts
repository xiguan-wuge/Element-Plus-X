import { MarkdownProps } from "../XMarkdownCore/shared/types";
declare function __VLS_template(): any;
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import("vue").DefineComponent<
  MarkdownProps,
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<MarkdownProps> & Readonly<{}>,
  {
    sanitize: boolean;
    markdown: string;
    customAttrs: import("../XMarkdownCore").CustomAttrs;
    remarkPlugins: import("unified").PluggableList;
    rehypePlugins: import("unified").PluggableList;
    rehypeOptions: Omit<import("mdast-util-to-hast").Options, "file">;
    sanitizeOptions: import("../XMarkdownCore").SanitizeOptions;
    themes: Partial<
      Record<
        string | "light" | "dark",
        | import("shiki").ThemeRegistrationAny
        | import("shiki").StringLiteralUnion<
            import("shiki").BundledTheme,
            string
          >
      >
    >;
    colorReplacements: Record<string, string | Record<string, string>>;
    codeXProps: import("../..").CodeXProps;
    codeXSlot: import("../XMarkdownCore/components/CodeBlock/shiki-header").CodeBlockHeaderExpose &
      Record<string, any>;
    viewCodeModalOptions: import("../XMarkdownCore/components/RunCode/type").ElxRunCodeOptions;
    codeXRender: Record<string, any>;
    allowHtml: boolean;
    enableAnimate: boolean;
    enableLatex: boolean;
    enableBreaks: boolean;
    rehypePluginsAhead: PluggableList;
    remarkPluginsAhead: PluggableList;
    langs: (import("shiki").LanguageInput | import("shiki").BundledLanguage)[];
    codeHighlightTheme: BuiltinTheme | null;
    mermaidConfig: Partial<MermaidToolbarConfig>;
    defaultThemeMode: "light" | "dark";
    needViewCodeBtn: boolean;
    secureViewCode: boolean;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  false,
  {},
  any
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
