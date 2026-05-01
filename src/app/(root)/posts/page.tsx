import Link from 'next/link'

import { listPublishedPosts } from '@/features/posts/post-source'

export default async function PostsPage() {
  const posts = await listPublishedPosts()

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-16 space-y-12">
      <article>
        <div className="m-auto max-w-[65ch] leading-7 text-base">
          <ul>
            {posts.map((post) => (
              <PostListItem
                key={post.slug}
                slug={post.slug}
                title={post.frontmatter.title}
                date={post.frontmatter.date}
                duration={post.frontmatter.duration}
              />
            ))}
          </ul>
        </div>
      </article>
    </div>
  )
}

function PostListItem({ slug, title, date, duration }: { slug: string; title: string; date?: string; duration?: string }) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="opacity-60 hover:opacity-100 block font-normal mb-6 mt-2 no-underline transition-all duration-200 ease-out border-b-0 text-white"
    >
      <li className="md:flex-row flex-col flex gap-2 md:items-center">
        <div className="text-lg leading-5 flex gap-2 flex-wrap">
          <span className="align-middle">{title}</span>
          <span className="align-middle opacity-50 flex-none text-xs -ml-1.5 icon-[carbon--arrow-up-right]" title="External" />
        </div>

        <div className="flex gap-2 items-center">
          {date ? <span>{date}</span> : null}
          {duration ? (
            <span className="text-sm whitespace-nowrap opacity-50">
              · {duration}
            </span>
          ) : null}
        </div>
      </li>
    </Link>
  )
}
