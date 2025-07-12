import type MarkdownIt from 'markdown-it'

export type MarkdownItPlugin = (md: MarkdownIt) => void

export interface AppConfigProps {
  mdPlugins?: MarkdownItPlugin[]
  highLight?: (code: string, language: string) => string
}
