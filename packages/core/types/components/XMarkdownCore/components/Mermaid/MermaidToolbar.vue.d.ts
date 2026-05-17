import { MermaidToolbarConfig } from "./types";
interface MermaidToolbarInternalProps {
  toolbarConfig?: MermaidToolbarConfig;
  isSourceCodeMode?: boolean;
  sourceCode?: string;
}
declare const _default: import("vue").DefineComponent<
  MermaidToolbarInternalProps,
  {},
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {
    onReset: () => any;
    onZoomIn: () => any;
    onZoomOut: () => any;
    onFullscreen: () => any;
    onEdit: () => any;
    onToggleCode: () => any;
    onCopyCode: () => any;
    onDownload: () => any;
  },
  string,
  import("vue").PublicProps,
  Readonly<MermaidToolbarInternalProps> &
    Readonly<{
      onOnReset?: (() => any) | undefined;
      onOnZoomIn?: (() => any) | undefined;
      onOnZoomOut?: (() => any) | undefined;
      onOnFullscreen?: (() => any) | undefined;
      onOnEdit?: (() => any) | undefined;
      onOnToggleCode?: (() => any) | undefined;
      onOnCopyCode?: (() => any) | undefined;
      onOnDownload?: (() => any) | undefined;
    }>,
  {
    toolbarConfig: MermaidToolbarConfig;
    isSourceCodeMode: boolean;
    sourceCode: string;
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
