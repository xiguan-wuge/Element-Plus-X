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
    placement: {
      control: "radio";
      options: string[];
    };
    avatar: {
      control: "text";
    };
    loading: {
      control: "boolean";
    };
    shape: {
      control: "radio";
      options: string[];
    };
    variant: {
      control: "radio";
      options: string[];
    };
    maxWidth: {
      control: "text";
    };
    avatarSize: {
      control: "text";
    };
    avatarGap: {
      control: "text";
    };
    avatarShape: {
      control: "radio";
      options: string[];
    };
    avatarSrcSet: {
      control: "text";
    };
    avatarAlt: {
      control: "text";
    };
    avatarFit: {
      control: "radio";
      options: string[];
    };
    noStyle: {
      control: "boolean";
    };
  };
  args: {
    avatar: string;
    loading: false;
    content: string;
    isMarkdown: true;
    typing: {
      step: number;
      suffix: string;
      interval: number;
      isRequestEnd: true;
    };
    isFog: true;
    placement: "start";
    shape: "round";
    variant: "filled";
    maxWidth: string;
    noStyle: false;
    avatarSize: string;
    avatarGap: string;
    avatarShape: "circle";
    avatarSrcSet: string;
    avatarAlt: string;
    avatarFit: "cover";
  };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BubbleDemo: Story;
export declare const SoltDemo: Story;
