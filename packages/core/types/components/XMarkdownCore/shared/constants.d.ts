import { GlobalShiki } from "../hooks/useShiki";
import { CodeXProps } from "./types";
import { BuiltinTheme } from "shiki";
import { PluggableList } from "unified";
import { MermaidToolbarConfig } from "../components/Mermaid/types";
import { ElxRunCodeOptions } from "../components/RunCode/type";
import { CustomAttrs, SanitizeOptions } from "../core";
import { InitShikiOptions } from "./shikiHighlighter";
export declare const shikiThemeDefault: InitShikiOptions["themes"];
export declare const DEFAULT_PROPS: {
  markdown: string;
  allowHtml: boolean;
  enableLatex: boolean;
  enableAnimate: boolean;
  enableBreaks: boolean;
  codeXProps: () => {};
  codeXRender: () => {};
  codeXSlot: () => {};
  codeHighlightTheme: null;
  customAttrs: () => {};
  remarkPlugins: () => never[];
  remarkPluginsAhead: () => never[];
  rehypePlugins: () => never[];
  rehypePluginsAhead: () => never[];
  rehypeOptions: () => {};
  sanitize: boolean;
  sanitizeOptions: () => {};
  mermaidConfig: () => {};
  langs: () => never[];
  defaultThemeMode: "light" | "dark";
  themes: () => {
    [x: string]:
      | import("shiki").ThemeRegistrationAny
      | import("shiki").StringLiteralUnion<import("shiki").BundledTheme, string>
      | undefined;
  };
  colorReplacements: () => {};
  needViewCodeBtn: boolean;
  secureViewCode: boolean;
  viewCodeModalOptions: () => {};
};
export declare const MARKDOWN_CORE_PROPS: {
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
    type: PropType<CodeXProps>;
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
    type: PropType<BuiltinTheme | null>;
    default: () => null;
  };
  customAttrs: {
    type: PropType<CustomAttrs>;
    default: () => {};
  };
  remarkPlugins: {
    type: PropType<PluggableList>;
    default: () => never[];
  };
  remarkPluginsAhead: {
    type: PropType<PluggableList>;
    default: () => never[];
  };
  rehypePlugins: {
    type: PropType<PluggableList>;
    default: () => never[];
  };
  rehypePluginsAhead: {
    type: PropType<PluggableList>;
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
    type: PropType<SanitizeOptions>;
    default: () => {};
  };
  mermaidConfig: {
    type: PropType<Partial<MermaidToolbarConfig>>;
    default: () => {};
  };
  langs: {
    type: PropType<InitShikiOptions["langs"]>;
    default: () => never[];
  };
  defaultThemeMode: {
    type: PropType<"light" | "dark">;
    default: string;
  };
  themes: {
    type: PropType<InitShikiOptions["themes"]>;
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
    type: PropType<InitShikiOptions["colorReplacements"]>;
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
    type: PropType<ElxRunCodeOptions>;
    default: () => {};
  };
  isDark: {
    type: BooleanConstructor;
    default: boolean;
  };
  globalShiki: {
    type: PropType<GlobalShiki>;
    default: () => {};
  };
};
