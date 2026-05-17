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
    {
      bubbleListRef: unknown;
      senderRef: unknown;
    },
    HTMLDivElement
  >;
  tags: string[];
  argTypes: {
    modelValue: {
      control: "boolean";
    };
    autoCollapse: {
      control: "boolean";
    };
    duration: {
      control: "text";
    };
    buttonWidth: {
      control: "text";
    };
    maxWidth: {
      control: "text";
    };
    backgroundColor: {
      control: "color";
    };
    color: {
      control: "color";
    };
  };
  args: {
    modelValue: true;
    autoCollapse: false;
    duration: string;
    buttonWidth: string;
    maxWidth: string;
    backgroundColor: string;
    color: string;
  };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const ThinkingDemo: Story;
