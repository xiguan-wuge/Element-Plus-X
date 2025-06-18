import type { PromptsItemsProps } from '../Prompts/types'

export interface BubbleProps<T extends PromptsItemsProps = PromptsItemsProps> {
  content?: string
  reasoning_content?: string
  placement?: 'start' | 'end'
  avatar?: string
  loading?: boolean
  shape?: 'round' | 'corner'
  variant?: 'filled' | 'borderless' | 'outlined' | 'shadow'
  isMarkdown?: boolean
  typing?: boolean | { step?: number, suffix?: string, interval?: number }
  isFog?: boolean | { bgColor?: string, width?: string }
  maxWidth?: string
  avatarSize?: string
  avatarGap?: string
  avatarShape?: 'circle' | 'square'
  avatarIcon?: string
  avatarSrcSet?: string
  avatarAlt?: string
  avatarFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  noStyle?: boolean
  isPrompts?: boolean
  promptItems?: T[]
}
