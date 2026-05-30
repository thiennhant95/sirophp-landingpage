export interface DocMeta {
  title: string
  description: string
  category: 'guide' | 'api' | 'root' | 'convention' | 'example'
  order: number
  icon?: string
}

export type ContentBlock =
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; id: string; text: string }
  | { type: 'p'; text: string }
  | { type: 'code'; lang?: string; code: string }
  | { type: 'ul'; items: (string | string[])[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; variant: 'info' | 'warn' | 'tip' | 'danger'; title?: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'hr' }

export interface Doc {
  meta: DocMeta
  content: ContentBlock[]
}

export interface DocCategory {
  label: string
  icon: string
  items: { slug: string; title: string; description: string }[]
}
