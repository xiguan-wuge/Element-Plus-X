import { Plugin } from "vue";
import { default as Attachments } from "./components/Attachments/index.vue";
import { default as Bubble } from "./components/Bubble/index.vue";
import { default as BubbleList } from "./components/BubbleList/index.vue";
import { default as ConfigProvider } from "./components/ConfigProvider/index.vue";
import { default as Conversations } from "./components/Conversations/index.vue";
import { default as FilesCard } from "./components/FilesCard/index.vue";
import { default as MentionSender } from "./components/MentionSender/index.vue";
import { default as Prompts } from "./components/Prompts/index.vue";
import { default as Sender } from "./components/Sender/index.vue";
import { default as Thinking } from "./components/Thinking/index.vue";
import { default as ThoughtChain } from "./components/ThoughtChain/index.vue";
import { default as Typewriter } from "./components/Typewriter/index.vue";
import { default as Welcome } from "./components/Welcome/index.vue";
import { default as XMarkdown } from "./components/XMarkdown/index.vue";
import { default as XMarkdownAsync } from "./components/XMarkdownAsync/index.vue";
import { default as XSender } from "./components/XSender/index.vue";
export { Attachments };
export { Bubble };
export { BubbleList };
export { ConfigProvider };
export { Conversations };
export { FilesCard };
export { MentionSender };
export { Prompts };
export { Sender };
export { Thinking };
export { ThoughtChain };
export { Typewriter };
export { Welcome };
export { XMarkdown };
export { XMarkdownAsync };
export { XSender };
export type {
  AttachmentsEmits,
  AttachmentsProps,
  FileListProps,
} from "./components/Attachments/types.d.ts";
export type { BubbleEmits, BubbleProps } from "./components/Bubble/types.d.ts";
export type {
  BubbleListEmits,
  BubbleListInstance,
  BubbleListItemProps,
  BubbleListProps,
} from "./components/BubbleList/types.d.ts";
export type {
  ConfigProviderProps,
  MarkdownItPlugin,
} from "./components/ConfigProvider/types.d.ts";
export type {
  Conversation,
  ConversationItem,
  ConversationItemUseOptions,
  ConversationMenu,
  ConversationMenuCommand,
  ConversationsEmits,
  GroupableOptions,
  GroupItem,
} from "./components/Conversations/types.d.ts";
export type {
  FilesCardEmits,
  FilesCardInstance,
  FilesCardProps,
  FilesType,
} from "./components/FilesCard/types.d.ts";
export type {
  MentionOption,
  MentionSenderEmits,
  MentionSenderProps,
} from "./components/MentionSender/types.d.ts";
export type {
  PromptsEmits,
  PromptsItemsProps,
  PromptsProps,
} from "./components/Prompts/types.d.ts";
export type {
  SenderEmits,
  SenderProps,
  TriggerEvent,
} from "./components/Sender/types.d.ts";
export type {
  ThinkingEmits,
  ThinkingProps,
  ThinkingStatus,
} from "./components/Thinking/types.d.ts";
export type {
  DefaultColor,
  DefaultThoughtChainItemProps,
  HexColor,
  ThoughtChainItemProps,
  ThoughtChainProps,
} from "./components/ThoughtChain/types.d.ts";
export type {
  TypewriterEmits,
  TypewriterInstance,
  TypewriterProps,
  TypingConfig,
  TypingFogfig,
} from "./components/Typewriter/types.d.ts";
export type {
  SemanticType,
  WelcomeProps,
} from "./components/Welcome/types.d.ts";
export type {
  CodeXProps,
  XMarkdownProps,
} from "./components/XMarkdown/types.d.ts";
export type { XMarkdownAsyncProps } from "./components/XMarkdownAsync/types.d.ts";
export type {
  ChatNode,
  FocusType,
  ModelValue,
  SenderState,
  Write,
  XSenderEmits,
  XSenderProps,
} from "./components/XSender/types.d.ts";
export * from "./hooks";
export interface ElementPlusXInstallOptions {
  locale?: import("./locale/types").Language;
}
export * from "./locale";
declare const ElementPlusX: Plugin;
export default ElementPlusX;
