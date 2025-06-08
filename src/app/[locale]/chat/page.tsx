import { unstable_setRequestLocale } from 'next-intl/server'
import { ChatClient } from '@/app/[locale]/chat/ChatClient'

export default function ChatPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return <ChatClient />
}
