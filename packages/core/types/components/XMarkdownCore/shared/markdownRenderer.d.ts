import { BuiltinTheme } from "shiki";
import { PluggableList } from "unified";
import { MermaidToolbarConfig } from "../components/Mermaid/types";
import { CustomAttrs, SanitizeOptions } from "../core";
import { InitShikiOptions } from "./shikiHighlighter";
declare const MarkdownProps: {
  markdown: {
    type: StringConstructor;
    default: string;
  };
  allowHtml: {
    type: BooleanConstructor;
    default: boolean;
  };
  enableCodeLineNumber: {
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
};
export { MarkdownProps };
