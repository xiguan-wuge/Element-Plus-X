import { StoryObj } from "@storybook/vue3";
declare const meta: {
  title: string;
  component: import("vue").DefineComponent<
    {
      markdown: string;
    },
    {},
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").PublicProps,
    Readonly<{
      markdown: string;
    }> &
      Readonly<{}>,
    {},
    {},
    {},
    {},
    string,
    import("vue").ComponentProvideOptions,
    false,
    {},
    any
  >;
  tags: string[];
  argTypes: {
    markdown: {
      control: "text";
    };
    themes: {
      control: "object";
      defaultValue: {
        [x: string]:
          | import("shiki").ThemeRegistrationAny
          | import("shiki").StringLiteralUnion<
              import("shiki").BundledTheme,
              string
            >
          | undefined;
      };
    };
    needViewCodeBtn: {
      control: "boolean";
      defaultValue: boolean;
    };
    secureViewCode: {
      control: "boolean";
      defaultValue: boolean;
    };
    defaultThemeMode: {
      control: "select";
      options: string[];
    };
    viewCodeModalOptions: {
      control: "object";
    };
    colorReplacements: {
      control: "object";
    };
    mermaidConfig: {
      control: "object";
    };
  };
  args: {
    markdown: string;
    themes: {
      [x: string]:
        | import("shiki").ThemeRegistrationAny
        | import("shiki").StringLiteralUnion<
            import("shiki").BundledTheme,
            string
          >
        | undefined;
    };
    needViewCodeBtn: boolean;
    secureViewCode: boolean;
    viewCodeModalOptions: {
      mode: string;
      customClass: string;
      dialogOptions: {
        closeOnClickModal: boolean;
        closeOnPressEscape: boolean;
      };
      drawerOptions: {
        closeOnClickModal: boolean;
        closeOnPressEscape: boolean;
      };
    };
    defaultThemeMode: string;
    colorReplacements: {
      "vitesse-light": {
        "#ab5959": string;
        "#1e754f": string;
      };
      "vitesse-dark": {
        "#cb7676": string;
        "#4d9375": string;
      };
    };
    mermaidConfig: {
      showToolbar: boolean;
      showFullscreen: boolean;
      showZoomIn: boolean;
      showZoomOut: boolean;
      showReset: boolean;
      showDownload: boolean;
      toolbarStyle: {};
      toolbarClass: string;
    };
  };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const MarkdownDemo: Story;
export declare const highlightMdContentDemo: Story;
export declare const PieRenderDemo: Story;
export declare const MathRenderDemo: Story;
export declare const MermaidSlotDemo: Story;
export declare const CustomAttrsDemo: Story;
export declare const AnimateTestDemo: Story;
