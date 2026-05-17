import { Pluggable } from "unified";
import { default as remarkGfm } from "remark-gfm";
declare function usePlugins(props: any): {
  rehypePlugins: globalThis.ComputedRef<Pluggable[]>;
  remarkPlugins: globalThis.ComputedRef<
    (
      | import("unified").Plugin<any[], any, any>
      | [
          plugin: import("unified").Plugin<any[], any, any>,
          ...parameters: any[],
        ]
      | import("unified").Preset
      | {
          plugins: Pluggable[];
        }
      | (
          | typeof remarkGfm
          | {
              singleTilde: boolean;
            }
        )[]
    )[]
  >;
};
export { usePlugins };
