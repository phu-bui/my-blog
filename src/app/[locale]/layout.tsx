import '@/once-ui/styles/index.scss'
import '@/once-ui/tokens/index.scss'

import classNames from 'classnames'

import { Footer, Header, RouteGuard } from '@/components'
import { baseURL, effects, style } from '@/app/resources'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { routing } from '@/i18n/routing'
import { renderContent } from '@/app/resources'
import { Background, Flex } from '@/once-ui/components'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations()
  const { person, home } = renderContent(t)

  return {
    metadataBase: new URL(`https://${baseURL}/${locale}`),
    title: home.title,
    description: home.description,
    keywords: ['portfolio', 'design engineer', 'web development', 'UI/UX', 'Next.js', 'React'],
    authors: [{ name: person.name }],
    creator: person.name,
    publisher: person.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: 'Portfolio website showcasing my work.',
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: `https://${baseURL}/og?title=${encodeURIComponent(home.title)}`,
          width: 1200,
          height: 630,
          alt: home.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${person.firstName}'s Portfolio`,
      description: 'Portfolio website showcasing my work.',
      images: [`https://${baseURL}/og?title=${encodeURIComponent(home.title)}`],
      creator: '@yourtwitterhandle', // Add your Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://${baseURL}/${locale}`,
      languages: {
        en: `https://${baseURL}/en`,
        id: `https://${baseURL}/id`,
      },
    },
  }
}

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
})

type FontConfig = {
  variable: string
}

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined
const tertiary: FontConfig | undefined = undefined
/*
 */

const code = Source_Code_Pro({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <Flex
        as="html"
        lang="en"
        background="page"
        data-neutral={style.neutral}
        data-brand={style.brand}
        data-accent={style.accent}
        data-solid={style.solid}
        data-solid-style={style.solidStyle}
        data-theme={style.theme}
        data-border={style.border}
        data-surface={style.surface}
        data-transition={style.transition}
        className={classNames(
          primary.variable,
          secondary ? secondary.variable : '',
          tertiary ? tertiary.variable : '',
          code.variable,
        )}
      >
        <Flex style={{ minHeight: '100vh' }} as="body" fillWidth margin="0" padding="0" direction="column">
          <Background
            mask={effects.mask as any}
            gradient={effects.gradient as any}
            dots={effects.dots as any}
            lines={effects.lines as any}
          />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex zIndex={0} fillWidth paddingY="l" paddingX="l" justifyContent="center" flex={1}>
            <Flex justifyContent="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </NextIntlClientProvider>
  )
}
