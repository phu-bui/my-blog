'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react'

// Load NotionRenderer dynamically (SSR = false)
const NotionRenderer = dynamic(
  () => import('react-notion-x').then((m) => m.NotionRenderer),
  { ssr: false }
)

// Các plugin hỗ trợ thêm (cũng dynamic import)
const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
  { ssr: false }
)
const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
  { ssr: false }
)
const Equation = dynamic(
  () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
  { ssr: false }
)

interface Props {
  recordMap: any
}

const NotionClientRenderer: FC<Props> = ({ recordMap }) => {
  if (!recordMap) return null

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={false}
      // components={{ Code, Collection, Equation }}
    />
  )
}

export default NotionClientRenderer
