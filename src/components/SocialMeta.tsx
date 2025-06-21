import { Metadata } from 'next'

interface SocialMetaProps {
  title: string
  description: string
  url: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
  locale?: string
}

export function generateSocialMeta({
  title,
  description,
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Phu Bui',
  section,
  tags = [],
  locale = 'en_US',
}: SocialMetaProps): Metadata {
  const ogImage = image || `https://demo.magic-portfolio.com/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: "Phu Bui's Portfolio",
      locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        section,
        tags,
        authors: [author],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@yourtwitterhandle', // Replace with your Twitter handle
    },
    alternates: {
      canonical: url,
    },
  }
}
