export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  loading?: boolean;
  isMarkdown?: boolean;
  isFog?: boolean;
  customProps?: Record<string, any>;
}

export interface ChatDialogProps {
  messages: ChatMessage[];
  maxHeight?: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  allowSpeech?: boolean;
  autoScroll?: boolean;
  showAvatar?: boolean;
  userAvatar?: string;
  aiAvatar?: string;
  userAvatarSize?: number;
  aiAvatarSize?: number;
  bubbleMaxWidth?: string;
  typingSpeed?: number;
  showTypingEffect?: boolean;
}

export interface ChatDialogInstance {
  addAIResponse: (content: string, options?: Partial<ChatMessage>) => void;
  setMessageLoading: (messageId: string, loading: boolean) => void;
  updateMessage: (messageId: string, content: string) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollToMessage: (index: number) => void;
  clear: () => void;
  focus: () => void;
}
