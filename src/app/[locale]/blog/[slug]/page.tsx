import ScrollToHash from '@/components/ScrollToHash'
import { notFound } from 'next/navigation'
import { Avatar, Button, Flex, Heading, SmartImage, Tag, Text } from '@/once-ui/components'

import { baseURL } from '@/app/resources'
import { unstable_setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { formatDate } from '@/app/utils/formatDate'
import getBlogIndex from '@/lib/notion/getBlogIndex'
import { getPostList } from '@/lib/notion/utils'
import NotionClientRenderer from '@/components/NotionClientRenderer'

interface BlogParams {
  params: {
    slug: string
    locale: string
  }
}

export async function generateStaticParams() {
  const locales = routing.locales

  // Create an array to store all posts from all locales
  const allPosts: { slug: string; locale: string }[] = []

  // Fetch posts for each locale
  const postsTable = await getBlogIndex()
  const posts = getPostList(postsTable)
  for (const locale of locales) {
    allPosts.push(
      ...(await posts).map((post) => ({
        slug: post.slug,
        locale: locale,
      })),
    )
  }

  return allPosts
}

export async function generateMetadata({ params: { slug, locale } }: BlogParams) {
  const postsTable = await getBlogIndex()
  const posts = await getPostList(postsTable)
  let post = posts.find((post) => post.Slug === slug)

  if (!post) {
    return
  }

  let { Title: title, Date: publishedTime, summary: description, Image: image, Tag: tag } = post
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`

  const keywords = tag ? [tag, 'blog', 'design', 'technology'] : ['blog', 'design', 'technology']

  return {
    title: `${title} | Blog`,
    description,
    keywords,
    authors: [{ name: 'Phu Bui' }],
    creator: 'Phu Bui',
    publisher: 'Phu Bui',
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      modifiedTime: publishedTime,
      url: `https://${baseURL}/${locale}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      section: 'Technology',
      tags: tag ? [tag] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@yourtwitterhandle',
    },
    alternates: {
      canonical: `https://${baseURL}/${locale}/blog/${post.slug}`,
    },
  }
}

export default async function Blog({ params }: BlogParams) {
  unstable_setRequestLocale(params.locale)
  const postsTable = await getBlogIndex()
  const posts = await getPostList(postsTable)
  let post = posts.find((post) => post.Slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Flex as="section" fillWidth maxWidth="xs" direction="column" gap="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `https://${baseURL}/${params.locale}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `https://${baseURL}/${params.locale}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.Title,
                item: `https://${baseURL}/${params.locale}/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.Title,
            datePublished: post.Date,
            dateModified: post.Date,
            description: post.summary,
            image: post.Image ? `https://${baseURL}${post.Image}` : `https://${baseURL}/og?title=${post.Title}`,
            url: `https://${baseURL}/${params.locale}/blog/${post.slug}`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://${baseURL}/${params.locale}/blog/${post.slug}`,
            },
            author: {
              '@type': 'Person',
              name: 'Phu Bui',
              url: `https://${baseURL}/about`,
              image: `https://${baseURL}/images/avatar.jpg`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Phu Bui Portfolio',
              logo: {
                '@type': 'ImageObject',
                url: `https://${baseURL}/images/avatar.jpg`,
              },
            },
            articleSection: 'Technology',
            keywords: post.Tag || 'design, technology, development',
            wordCount: post.summary?.length || 0,
            timeRequired: 'PT5M', // Estimated reading time
            inLanguage: params.locale,
          }),
        }}
      />
      <Button href={`/${params.locale}/blog`} variant="tertiary" size="s" prefixIcon="chevronLeft">
        Posts
      </Button>
      <Heading variant="display-strong-s">{post.Title}</Heading>
      <Flex gap="12" alignItems="center">
        {post.Authors.length > 0 &&
          post.Authors.map((author, index) => <Avatar key={index} size="s" src={author.profile_photo} />)}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {formatDate(post.Date)}
        </Text>
      </Flex>
      {post.Image && <SmartImage aspectRatio="16 / 9" radius="m" alt="image" src={post.Image} unoptimized />}
      <Flex as="article" direction="column" fillWidth>
        <NotionClientRenderer recordMap={post.preview} />
      </Flex>
      {post.Tag && <Tag className="mt-8" label={post.Tag} variant="neutral" />}
      <ScrollToHash />
    </Flex>
  )
}
