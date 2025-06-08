'use client'

import { useState, useRef, useEffect } from 'react'
import { Flex, Text, Input, Icon, Avatar, Button } from '@/once-ui/components'
import { HiPaperAirplane } from 'react-icons/hi2'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Flex as="section" fillWidth maxWidth="m" direction="column" gap="l" style={{ flex: 1, overflow: 'hidden' }}>
        <Flex
          fillWidth
          direction="column"
          flex={1}
          gap="m"
          style={{
            overflowY: 'auto',
            paddingBottom: '00px',
            paddingTop: 'var(--once-ui-gap-l)',
            paddingLeft: 'var(--once-ui-gap-l)',
            paddingRight: 'var(--once-ui-gap-l)',
          }}
        >
          {messages.length === 0 && (
            <Flex fillWidth justifyContent="center" alignItems="center" padding="xl">
              <Text variant="body-default-l" onBackground="neutral-weak">
                Start a conversation by typing a message below
              </Text>
            </Flex>
          )}

          {messages.map((message, index) => (
            <Flex key={index} fillWidth gap="s" justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'}>
              {message.role === 'assistant' && (
                <Flex alignItems="flex-end" padding="xs">
                  <Avatar src="/images/avatar.jpg" size="m" />
                </Flex>
              )}
              <Flex
                style={{ maxWidth: '80%' }}
                padding="m"
                radius="m"
                background={message.role === 'user' ? 'brand-strong' : 'neutral-weak'}
              >
                <Text
                  variant="body-default-m"
                  onBackground={message.role === 'user' ? 'neutral-strong' : 'neutral-weak'}
                >
                  {message.content}
                </Text>
              </Flex>
              {message.role === 'user' && (
                <Flex alignItems="flex-end" padding="xs">
                  <Icon onBackground="accent-weak" name="person" />
                </Flex>
              )}
            </Flex>
          ))}
          {isLoading && (
            <Flex fillWidth justifyContent="flex-start">
              <Flex padding="m" radius="m" background="neutral-weak" gap="s">
                <Text variant="body-default-m" onBackground="neutral-strong">
                  ...
                </Text>
              </Flex>
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </Flex>
      </Flex>

      <form
        onSubmit={handleSubmit}
        style={{
          position: 'fixed',
          bottom: 40,
          left: 0,
          width: '100%',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          zIndex: 10,
          paddingTop: 'var(--once-ui-gap-m)',
          paddingBottom: 'var(--once-ui-gap-m)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Flex maxWidth="xl" gap="m" paddingX="l" alignItems="center">
          <Input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Type your message..."
            labelAsPlaceholder
            height="m"
            radius="m"
            disabled={isLoading}
            style={{ width: '100%' }}
          />
          <Button type="submit" disabled={isLoading}>
            <HiPaperAirplane className="h-5 w-5 rotate-90" />
          </Button>
        </Flex>
      </form>
    </>
  )
}
