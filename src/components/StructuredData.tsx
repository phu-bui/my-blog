import { ReactNode } from 'react'

interface StructuredDataProps {
  data: Record<string, any>
  children?: ReactNode
}

export function StructuredData({ data, children }: StructuredDataProps) {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data),
        }}
      />
      {children}
    </>
  )
}

// Predefined structured data schemas
export const schemas = {
  person: (data: {
    name: string
    jobTitle: string
    description: string
    url: string
    image: string
    sameAs: string[]
    worksFor?: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle,
    description: data.description,
    url: data.url,
    image: data.image,
    sameAs: data.sameAs,
    ...(data.worksFor && {
      worksFor: {
        '@type': 'Organization',
        name: data.worksFor,
      },
    }),
  }),

  blogPost: (data: {
    headline: string
    datePublished: string
    dateModified: string
    description: string
    image: string
    url: string
    author: string
    authorUrl: string
    authorImage: string
    publisher: string
    publisherLogo: string
    section: string
    keywords: string
    wordCount: number
    timeRequired: string
    inLanguage: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    description: data.description,
    image: data.image,
    url: data.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    author: {
      '@type': 'Person',
      name: data.author,
      url: data.authorUrl,
      image: data.authorImage,
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher,
      logo: {
        '@type': 'ImageObject',
        url: data.publisherLogo,
      },
    },
    articleSection: data.section,
    keywords: data.keywords,
    wordCount: data.wordCount,
    timeRequired: data.timeRequired,
    inLanguage: data.inLanguage,
  }),

  breadcrumb: (data: { items: Array<{ name: string; url: string }> }) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  website: (data: {
    name: string
    description: string
    url: string
    image: string
    publisher: string
    publisherImage: string
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
    publisher: {
      '@type': 'Person',
      name: data.publisher,
      image: {
        '@type': 'ImageObject',
        url: data.publisherImage,
      },
    },
  }),
}
