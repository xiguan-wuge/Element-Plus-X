declare const MarkdownRenderer: import("vue").DefineComponent<
  globalThis.ExtractPropTypes<{
    markdown: {
      type: StringConstructor;
      default: string;
    };
    allowHtml: {
      type: BooleanConstructor;
      default: boolean;
    };
    enableLatex: {
      type: BooleanConstructor;
      default: boolean;
    };
    enableAnimate: {
      type: BooleanConstructor;
      default: boolean;
    };
    enableBreaks: {
      type: BooleanConstructor;
      default: boolean;
    };
    codeXProps: {
      type: PropType<import("../shared/types").CodeXProps>;
      default: () => {
        enableCodePreview: boolean;
        enableCodeCopy: boolean;
        enableThemeToggle: boolean;
        enableCodeLineNumber: boolean;
      };
    };
    codeXRender: {
      type: ObjectConstructor;
      default: () => {};
    };
    codeXSlot: {
      type: ObjectConstructor;
      default: () => {};
    };
    codeHighlightTheme: {
      type: PropType<import("shiki").BuiltinTheme | null>;
      default: () => null;
    };
    customAttrs: {
      type: PropType<import("..").CustomAttrs>;
      default: () => {};
    };
    remarkPlugins: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    remarkPluginsAhead: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    rehypePlugins: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    rehypePluginsAhead: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    rehypeOptions: {
      type: PropType<Record<string, any>>;
      default: () => {};
    };
    sanitize: {
      type: BooleanConstructor;
      default: boolean;
    };
    sanitizeOptions: {
      type: PropType<import("..").SanitizeOptions>;
      default: () => {};
    };
    mermaidConfig: {
      type: PropType<
        Partial<import("../components/Mermaid/types").MermaidToolbarConfig>
      >;
      default: () => {};
    };
    langs: {
      type: PropType<import("../shared").InitShikiOptions["langs"]>;
      default: () => never[];
    };
    defaultThemeMode: {
      type: PropType<"light" | "dark">;
      default: string;
    };
    themes: {
      type: PropType<import("../shared").InitShikiOptions["themes"]>;
      default: () => {
        [x: string]:
          | import("shiki").ThemeRegistrationAny
          | import("shiki").StringLiteralUnion<
              import("shiki").BundledTheme,
              string
            >
          | undefined;
      };
    };
    colorReplacements: {
      type: PropType<import("../shared").InitShikiOptions["colorReplacements"]>;
      default: () => {};
    };
    needViewCodeBtn: {
      type: BooleanConstructor;
      default: boolean;
    };
    secureViewCode: {
      type: BooleanConstructor;
      default: boolean;
    };
    viewCodeModalOptions: {
      type: PropType<import("../components/RunCode/type").ElxRunCodeOptions>;
      default: () => {};
    };
    isDark: {
      type: BooleanConstructor;
      default: boolean;
    };
    globalShiki: {
      type: PropType<import("../hooks/useShiki").GlobalShiki>;
      default: () => {};
    };
  }>,
  () => globalThis.VNode<
    import("vue").RendererNode,
    import("vue").RendererElement,
    {
      [key: string]: any;
    }
  >,
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<
    globalThis.ExtractPropTypes<{
      markdown: {
        type: StringConstructor;
        default: string;
      };
      allowHtml: {
        type: BooleanConstructor;
        default: boolean;
      };
      enableLatex: {
        type: BooleanConstructor;
        default: boolean;
      };
      enableAnimate: {
        type: BooleanConstructor;
        default: boolean;
      };
      enableBreaks: {
        type: BooleanConstructor;
        default: boolean;
      };
      codeXProps: {
        type: PropType<import("../shared/types").CodeXProps>;
        default: () => {
          enableCodePreview: boolean;
          enableCodeCopy: boolean;
          enableThemeToggle: boolean;
          enableCodeLineNumber: boolean;
        };
      };
      codeXRender: {
        type: ObjectConstructor;
        default: () => {};
      };
      codeXSlot: {
        type: ObjectConstructor;
        default: () => {};
      };
      codeHighlightTheme: {
        type: PropType<import("shiki").BuiltinTheme | null>;
        default: () => null;
      };
      customAttrs: {
        type: PropType<import("..").CustomAttrs>;
        default: () => {};
      };
      remarkPlugins: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      remarkPluginsAhead: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      rehypePlugins: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      rehypePluginsAhead: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      rehypeOptions: {
        type: PropType<Record<string, any>>;
        default: () => {};
      };
      sanitize: {
        type: BooleanConstructor;
        default: boolean;
      };
      sanitizeOptions: {
        type: PropType<import("..").SanitizeOptions>;
        default: () => {};
      };
      mermaidConfig: {
        type: PropType<
          Partial<import("../components/Mermaid/types").MermaidToolbarConfig>
        >;
        default: () => {};
      };
      langs: {
        type: PropType<import("../shared").InitShikiOptions["langs"]>;
        default: () => never[];
      };
      defaultThemeMode: {
        type: PropType<"light" | "dark">;
        default: string;
      };
      themes: {
        type: PropType<import("../shared").InitShikiOptions["themes"]>;
        default: () => {
          [x: string]:
            | import("shiki").ThemeRegistrationAny
            | import("shiki").StringLiteralUnion<
                import("shiki").BundledTheme,
                string
              >
            | undefined;
        };
      };
      colorReplacements: {
        type: PropType<
          import("../shared").InitShikiOptions["colorReplacements"]
        >;
        default: () => {};
      };
      needViewCodeBtn: {
        type: BooleanConstructor;
        default: boolean;
      };
      secureViewCode: {
        type: BooleanConstructor;
        default: boolean;
      };
      viewCodeModalOptions: {
        type: PropType<import("../components/RunCode/type").ElxRunCodeOptions>;
        default: () => {};
      };
      isDark: {
        type: BooleanConstructor;
        default: boolean;
      };
      globalShiki: {
        type: PropType<import("../hooks/useShiki").GlobalShiki>;
        default: () => {};
      };
    }>
  > &
    Readonly<{}>,
  {
    sanitize: boolean;
    markdown: string;
    customAttrs: import("..").CustomAttrs;
    remarkPlugins: import("unified").PluggableList;
    rehypePlugins: import("unified").PluggableList;
    rehypeOptions: Record<string, any>;
    sanitizeOptions: import("..").SanitizeOptions;
    themes: Partial<
      Record<
        string,
        | import("shiki").ThemeRegistrationAny
        | import("shiki").StringLiteralUnion<
            import("shiki").BundledTheme,
            string
          >
      >
    >;
    colorReplacements: Record<string, string | Record<string, string>>;
    codeXProps: import("../shared/types").CodeXProps;
    codeXSlot: Record<string, any>;
    globalShiki: import("../hooks/useShiki").GlobalShiki;
    isDark: boolean;
    viewCodeModalOptions: import("../components/RunCode/type").ElxRunCodeOptions;
    codeXRender: Record<string, any>;
    allowHtml: boolean;
    enableAnimate: boolean;
    enableLatex: boolean;
    enableBreaks: boolean;
    rehypePluginsAhead: import("unified").PluggableList;
    remarkPluginsAhead: import("unified").PluggableList;
    langs:
      | (import("shiki").LanguageInput | import("shiki").BundledLanguage)[]
      | undefined;
    codeHighlightTheme: import("shiki").BundledTheme | null;
    mermaidConfig: Partial<
      import("../components/Mermaid/types").MermaidToolbarConfig
    >;
    defaultThemeMode: "dark" | "light";
    needViewCodeBtn: boolean;
    secureViewCode: boolean;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  true,
  {},
  any
>;
declare const MarkdownRendererAsync: import("vue").DefineComponent<
  globalThis.ExtractPropTypes<{
    markdown: {
      type: StringConstructor;
      default: string;
    };
    allowHtml: {
      type: BooleanConstructor;
      default: boolean;
    };
    enableLatex: {
      type: BooleanConstructor;
      default: boolean;
    };
    enableAnimate: {
      type: BooleanConstructor;
      default: boolean;
    };
    enableBreaks: {
      type: BooleanConstructor;
      default: boolean;
    };
    codeXProps: {
      type: PropType<import("../shared/types").CodeXProps>;
      default: () => {
        enableCodePreview: boolean;
        enableCodeCopy: boolean;
        enableThemeToggle: boolean;
        enableCodeLineNumber: boolean;
      };
    };
    codeXRender: {
      type: ObjectConstructor;
      default: () => {};
    };
    codeXSlot: {
      type: ObjectConstructor;
      default: () => {};
    };
    codeHighlightTheme: {
      type: PropType<import("shiki").BuiltinTheme | null>;
      default: () => null;
    };
    customAttrs: {
      type: PropType<import("..").CustomAttrs>;
      default: () => {};
    };
    remarkPlugins: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    remarkPluginsAhead: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    rehypePlugins: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    rehypePluginsAhead: {
      type: PropType<import("unified").PluggableList>;
      default: () => never[];
    };
    rehypeOptions: {
      type: PropType<Record<string, any>>;
      default: () => {};
    };
    sanitize: {
      type: BooleanConstructor;
      default: boolean;
    };
    sanitizeOptions: {
      type: PropType<import("..").SanitizeOptions>;
      default: () => {};
    };
    mermaidConfig: {
      type: PropType<
        Partial<import("../components/Mermaid/types").MermaidToolbarConfig>
      >;
      default: () => {};
    };
    langs: {
      type: PropType<import("../shared").InitShikiOptions["langs"]>;
      default: () => never[];
    };
    defaultThemeMode: {
      type: PropType<"light" | "dark">;
      default: string;
    };
    themes: {
      type: PropType<import("../shared").InitShikiOptions["themes"]>;
      default: () => {
        [x: string]:
          | import("shiki").ThemeRegistrationAny
          | import("shiki").StringLiteralUnion<
              import("shiki").BundledTheme,
              string
            >
          | undefined;
      };
    };
    colorReplacements: {
      type: PropType<import("../shared").InitShikiOptions["colorReplacements"]>;
      default: () => {};
    };
    needViewCodeBtn: {
      type: BooleanConstructor;
      default: boolean;
    };
    secureViewCode: {
      type: BooleanConstructor;
      default: boolean;
    };
    viewCodeModalOptions: {
      type: PropType<import("../components/RunCode/type").ElxRunCodeOptions>;
      default: () => {};
    };
    isDark: {
      type: BooleanConstructor;
      default: boolean;
    };
    globalShiki: {
      type: PropType<import("../hooks/useShiki").GlobalShiki>;
      default: () => {};
    };
  }>,
  () => globalThis.VNode<
    import("vue").RendererNode,
    import("vue").RendererElement,
    {
      [key: string]: any;
    }
  >,
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<
    globalThis.ExtractPropTypes<{
      markdown: {
        type: StringConstructor;
        default: string;
      };
      allowHtml: {
        type: BooleanConstructor;
        default: boolean;
      };
      enableLatex: {
        type: BooleanConstructor;
        default: boolean;
      };
      enableAnimate: {
        type: BooleanConstructor;
        default: boolean;
      };
      enableBreaks: {
        type: BooleanConstructor;
        default: boolean;
      };
      codeXProps: {
        type: PropType<import("../shared/types").CodeXProps>;
        default: () => {
          enableCodePreview: boolean;
          enableCodeCopy: boolean;
          enableThemeToggle: boolean;
          enableCodeLineNumber: boolean;
        };
      };
      codeXRender: {
        type: ObjectConstructor;
        default: () => {};
      };
      codeXSlot: {
        type: ObjectConstructor;
        default: () => {};
      };
      codeHighlightTheme: {
        type: PropType<import("shiki").BuiltinTheme | null>;
        default: () => null;
      };
      customAttrs: {
        type: PropType<import("..").CustomAttrs>;
        default: () => {};
      };
      remarkPlugins: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      remarkPluginsAhead: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      rehypePlugins: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      rehypePluginsAhead: {
        type: PropType<import("unified").PluggableList>;
        default: () => never[];
      };
      rehypeOptions: {
        type: PropType<Record<string, any>>;
        default: () => {};
      };
      sanitize: {
        type: BooleanConstructor;
        default: boolean;
      };
      sanitizeOptions: {
        type: PropType<import("..").SanitizeOptions>;
        default: () => {};
      };
      mermaidConfig: {
        type: PropType<
          Partial<import("../components/Mermaid/types").MermaidToolbarConfig>
        >;
        default: () => {};
      };
      langs: {
        type: PropType<import("../shared").InitShikiOptions["langs"]>;
        default: () => never[];
      };
      defaultThemeMode: {
        type: PropType<"light" | "dark">;
        default: string;
      };
      themes: {
        type: PropType<import("../shared").InitShikiOptions["themes"]>;
        default: () => {
          [x: string]:
            | import("shiki").ThemeRegistrationAny
            | import("shiki").StringLiteralUnion<
                import("shiki").BundledTheme,
                string
              >
            | undefined;
        };
      };
      colorReplacements: {
        type: PropType<
          import("../shared").InitShikiOptions["colorReplacements"]
        >;
        default: () => {};
      };
      needViewCodeBtn: {
        type: BooleanConstructor;
        default: boolean;
      };
      secureViewCode: {
        type: BooleanConstructor;
        default: boolean;
      };
      viewCodeModalOptions: {
        type: PropType<import("../components/RunCode/type").ElxRunCodeOptions>;
        default: () => {};
      };
      isDark: {
        type: BooleanConstructor;
        default: boolean;
      };
      globalShiki: {
        type: PropType<import("../hooks/useShiki").GlobalShiki>;
        default: () => {};
      };
    }>
  > &
    Readonly<{}>,
  {
    sanitize: boolean;
    markdown: string;
    customAttrs: import("..").CustomAttrs;
    remarkPlugins: import("unified").PluggableList;
    rehypePlugins: import("unified").PluggableList;
    rehypeOptions: Record<string, any>;
    sanitizeOptions: import("..").SanitizeOptions;
    themes: Partial<
      Record<
        string,
        | import("shiki").ThemeRegistrationAny
        | import("shiki").StringLiteralUnion<
            import("shiki").BundledTheme,
            string
          >
      >
    >;
    colorReplacements: Record<string, string | Record<string, string>>;
    codeXProps: import("../shared/types").CodeXProps;
    codeXSlot: Record<string, any>;
    globalShiki: import("../hooks/useShiki").GlobalShiki;
    isDark: boolean;
    viewCodeModalOptions: import("../components/RunCode/type").ElxRunCodeOptions;
    codeXRender: Record<string, any>;
    allowHtml: boolean;
    enableAnimate: boolean;
    enableLatex: boolean;
    enableBreaks: boolean;
    rehypePluginsAhead: import("unified").PluggableList;
    remarkPluginsAhead: import("unified").PluggableList;
    langs:
      | (import("shiki").LanguageInput | import("shiki").BundledLanguage)[]
      | undefined;
    codeHighlightTheme: import("shiki").BundledTheme | null;
    mermaidConfig: Partial<
      import("../components/Mermaid/types").MermaidToolbarConfig
    >;
    defaultThemeMode: "dark" | "light";
    needViewCodeBtn: boolean;
    secureViewCode: boolean;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  true,
  {},
  any
>;
export { MarkdownRenderer, MarkdownRendererAsync };
