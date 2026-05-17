import { BubbleListProps } from "../../components/BubbleList/types";
type __VLS_Props = Pick<BubbleListProps, "list">;
declare const _default: import("vue").DefineComponent<
  __VLS_Props,
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<__VLS_Props> & Readonly<{}>,
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
export default _default;
