import { StoryObj } from "@storybook/vue3";
declare const meta: {
  title: string;
  component: import("vue").DefineComponent<
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
    {},
    any
  >;
  tags: string[];
  argTypes: {
    content: {
      control: "text";
    };
    isMarkdown: {
      control: "boolean";
    };
    typing: {
      control: "object";
    };
    isFog: {
      control: "boolean";
    };
  };
  args: {
    typing: {
      step: number;
      interval: number;
      suffix: string;
      isRequestEnd: true;
    };
    isFog: true;
    isMarkdown: true;
  };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const TypewriterDemo: Story;
export declare const MathRenderDemo: Story;
