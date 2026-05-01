import type { ReactNode } from 'react'

import type { PostFrontmatter } from '../post-types'

interface PostShellProps {
  children: ReactNode
  frontmatter: PostFrontmatter
}

export function PostShell({ children, frontmatter }: PostShellProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-16">
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {frontmatter.date ? <time dateTime={frontmatter.date}>{frontmatter.date}</time> : null}
          {frontmatter.duration ? <span>{frontmatter.duration}</span> : null}
          {frontmatter.author ? <span>{frontmatter.author}</span> : null}
        </div>

        <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
          {frontmatter.title}
        </h1>

        {frontmatter.description ? (
          <p className="text-lg text-muted-foreground">
            {frontmatter.description}
          </p>
        ) : null}

        {frontmatter.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <li key={tag} className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mdx-content">
        {children}
      </div>
    </article>
  )
}
