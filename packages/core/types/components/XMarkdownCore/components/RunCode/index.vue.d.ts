import { ElxRunCodeProps } from "./type";
declare const _default: import("vue").DefineComponent<
  ElxRunCodeProps,
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {} & {
    "update:visible": () => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<ElxRunCodeProps> &
    Readonly<{
      "onUpdate:visible"?: (() => any) | undefined;
    }>,
  {
    code: string[];
    mode: "dialog" | "drawer";
    lang: string;
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
export default _default;
