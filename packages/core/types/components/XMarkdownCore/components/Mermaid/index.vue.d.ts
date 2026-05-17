import { MdComponent } from "../types";
import { MermaidToolbarConfig } from "./types";
interface MermaidProps extends MdComponent {
  toolbarConfig?: MermaidToolbarConfig;
}
declare const _default: import("vue").DefineComponent<
  MermaidProps,
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  string,
  import("vue").PublicProps,
  Readonly<MermaidProps> & Readonly<{}>,
  {
    raw: any;
    toolbarConfig: MermaidToolbarConfig;
  },
  {},
  {},
  {},
  string,
  import("vue").ComponentProvideOptions,
  false,
  {
    containerRef: HTMLDivElement;
  },
  HTMLDivElement
>;
export default _default;
