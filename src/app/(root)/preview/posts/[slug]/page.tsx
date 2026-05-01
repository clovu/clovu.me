import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostShell } from '@/features/posts/components/post-shell'
import { loadPost } from '@/features/posts/post-loader'

interface PreviewPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

/**
 * Preview routes render on demand so draft frontmatter changes are visible immediately.
 */
export async function generateMetadata({ params }: PreviewPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug, { includeDrafts: true })

  if (!post) {
    return {}
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: post.frontmatter.author ? [{ name: post.frontmatter.author }] : undefined,
  }
}

export default async function PreviewPostPage({ params }: PreviewPostPageProps) {
  const { slug } = await params
  const post = await loadPost(slug, { includeDrafts: true })

  if (!post) {
    notFound()
  }

  const { Content, frontmatter } = post

  return (
    <PostShell frontmatter={frontmatter}>
      <Content />
    </PostShell>
  )
}
