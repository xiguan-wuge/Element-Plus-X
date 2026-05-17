import { Element, Root, RootContent } from "hast";
import { MaybeRefOrGetter, Slots, VNode, VNodeArrayChildren } from "vue";
import { AliasList, Context, CustomAttrs } from "./types";
export declare function render(
  hast: Root,
  attrs: Record<string, unknown>,
  slots?: Slots,
  customAttrs?: MaybeRefOrGetter<CustomAttrs>,
): VNode;
export declare function renderChildren(
  nodeList: (RootContent | Root)[],
  ctx: Context,
  parent: Element | Root,
  slots: Slots,
  customAttrs: CustomAttrs,
): VNodeArrayChildren;
export declare function getVNodeInfos(
  node: RootContent,
  parent: Element | Root,
  context: Context,
  keyCounter: Record<string, number>,
  customAttrs: CustomAttrs,
): {
  attrs: Record<string, unknown>;
  context: Context;
  aliasList: AliasList;
  vnodeProps: Record<string, any>;
};
