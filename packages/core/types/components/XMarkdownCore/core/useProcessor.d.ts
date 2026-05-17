import { Root } from "hast";
import { Root as MdastRoot } from "mdast";
import { Options as TRehypeOptions } from "mdast-util-to-hast";
import { PluggableList, Processor } from "unified";
import { ComputedRef, MaybeRefOrGetter } from "vue";
import { SanitizeOptions } from "./types";
export interface TUseMarkdownProcessorOptions {
  remarkPlugins?: MaybeRefOrGetter<PluggableList>;
  rehypePlugins?: MaybeRefOrGetter<PluggableList>;
  rehypeOptions?: MaybeRefOrGetter<Omit<TRehypeOptions, "file">>;
  sanitize?: MaybeRefOrGetter<boolean>;
  sanitizeOptions?: MaybeRefOrGetter<SanitizeOptions>;
}
export declare function useMarkdownProcessor(
  options?: TUseMarkdownProcessorOptions,
): {
  processor: ComputedRef<
    Processor<MdastRoot, MdastRoot, Root, undefined, undefined>
  >;
};
export declare function createProcessor(options?: {
  prePlugins?: PluggableList;
  rehypePlugins?: PluggableList;
  rehypeOptions?: Omit<TRehypeOptions, "file">;
  sanitize?: boolean;
  sanitizeOptions?: SanitizeOptions;
}): Processor<any, any, any, any, any>;
