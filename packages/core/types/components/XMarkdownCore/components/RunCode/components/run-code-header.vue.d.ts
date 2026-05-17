import { ElxRunCodeHeaderTypes } from "../type";
interface ElxRunCodeProps {
  value: ElxRunCodeHeaderTypes["options"];
}
declare const _default: import("vue").DefineComponent<
  ElxRunCodeProps,
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {} & {
    changeSelect: (val: string) => any;
    "update:value": () => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<ElxRunCodeProps> &
    Readonly<{
      onChangeSelect?: ((val: string) => any) | undefined;
      "onUpdate:value"?: (() => any) | undefined;
    }>,
  {},
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  false,
  {},
  HTMLDivElement
>;
export default _default;
