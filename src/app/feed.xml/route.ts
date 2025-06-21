import { getPosts } from '@/app/utils/utils'
import { baseURL } from '@/app/resources'

export async function GET() {
  const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', 'en']).slice(0, 10) // Latest 10 posts

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>Phu Bui's Blog</title>
    <description>Design engineer and builder writing about design, technology, and the intersection of creativity and engineering.</description>
    <link>https://${baseURL}/blog</link>
    <atom:link href="https://${baseURL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
        <guid>https://${baseURL}/blog/${post.slug}</guid>
        <title>${post.metadata.title}</title>
        <link>https://${baseURL}/blog/${post.slug}</link>
        <description>${post.metadata.summary}</description>
        <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        <category>${post.metadata.tag || 'Technology'}</category>
    </item>
    `,
      )
      .join('')}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
