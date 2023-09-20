import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import MemoizedMarkdown from '@/components/markdown'

export interface PostContentProps {
  content: string
}

export function PostContent({ content, ...props }: PostContentProps) {
  return (
    <div
      className={cn('group relative flex xs:max-w-md sm:max-w-lg md:max-w-2xl')}
      {...props}
    >
      <div className="flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            },
          }}
        >
          {content}
        </MemoizedMarkdown>
      </div>
    </div>
  )
}
