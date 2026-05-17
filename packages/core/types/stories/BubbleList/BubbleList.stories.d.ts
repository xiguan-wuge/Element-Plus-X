import { StoryObj } from "@storybook/vue3";
declare const meta: {
  title: string;
  component: import("vue").DefineComponent<
    {
      list: import("../..").BubbleListItemProps[];
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
      list: import("../..").BubbleListItemProps[];
    }> &
      Readonly<{}>,
    {},
    {},
    {},
    {},
    string,
    import("vue").ComponentProvideOptions,
    false,
    {
      bubbleListRef:
        | import("vue").ShallowUnwrapRef<{
            scrollToTop: () => void;
            scrollToBottom: () => void;
            scrollToBubble: (index: number) => void;
          }>
        | null;
    },
    HTMLDivElement
  >;
  tags: string[];
  argTypes: {
    autoScroll: {
      control: "boolean";
    };
    maxHeight: {
      control: "text";
    };
    triggerIndices: {
      control: "object";
    };
    alwaysShowScrollbar: {
      control: "boolean";
    };
    showBackButton: {
      control: "boolean";
    };
    backButtonPosition: {
      control: "object";
    };
    backButtonThreshold: {
      control: "number";
    };
    btnLoading: {
      control: "boolean";
    };
    btnColor: {
      control: "color";
    };
    btnIconSize: {
      control: "number";
    };
  };
  args: {
    list: import("../../assets/mock").MessageItem[];
    autoScroll: true;
    maxHeight: string;
    triggerIndices: "only-last";
    alwaysShowScrollbar: true;
    showBackButton: true;
    backButtonPosition: {
      bottom: string;
      left: string;
    };
    backButtonThreshold: number;
    btnLoading: true;
    btnColor: string;
    btnIconSize: number;
  };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BubbleListDemo: Story;
export declare const SoltDemo: Story;
