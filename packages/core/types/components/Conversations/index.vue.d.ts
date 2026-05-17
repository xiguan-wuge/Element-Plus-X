import { AnyObject } from "typescript-api-pro";
import {
  Conversation,
  ConversationItemUseOptions,
  ConversationMenuCommand,
  GroupItem,
} from "./types";
import { ConversationsEmits } from "./types.d.ts";
declare const _default: <T extends AnyObject = AnyObject>(
  __VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"],
  __VLS_ctx?: __VLS_PrettifyLocal<
    Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">
  >,
  __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"],
  __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<
      Pick<
        Partial<{}> &
          Omit<
            {
              readonly onChange?: ((item: any) => any) | undefined;
              readonly onMenuCommand?:
                | ((command: ConversationMenuCommand, item: any) => any)
                | undefined;
              readonly "onUpdate:active"?:
                | ((value?: string | number | undefined) => any)
                | undefined;
            } & import("vue").VNodeProps &
              import("vue").AllowedComponentProps &
              import("vue").ComponentCustomProps,
            never
          >,
        "onChange" | "onMenuCommand" | "onUpdate:active"
      > &
        Conversation<T> &
        Partial<{}>
    > &
      import("vue").PublicProps;
    expose(exposed: import("vue").ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: {
      header?(_: {}): any;
      groupTitle?(_: { group: GroupItem }): any;
      label?(_: { item: any }): any;
      label?(_: { item: ConversationItemUseOptions<T> }): any;
      "more-filled"?(_: any): any;
      "more-filled"?(_: any): any;
      menu?(_: { item: any; handleOpen: any; handleClose: any }): any;
      menu?(_: {
        item: ConversationItemUseOptions<T>;
        handleOpen: any;
        handleClose: any;
      }): any;
      "load-more"?(_: {}): any;
      footer?(_: {}): any;
    };
    emit: ConversationsEmits;
  }>,
) => import("vue").VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
  [K in keyof T]: T[K];
} & {};
