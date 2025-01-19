import { NextApiRequest, NextApiResponse } from 'next'
import { postIsPublished } from '../blog-helpers'
import getNotionUsers from './getNotionUsers'

export function setHeaders(req: NextApiRequest, res: NextApiResponse): boolean {
  // set SPR/CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'pragma')

  if (req.method === 'OPTIONS') {
    res.status(200)
    res.end()
    return true
  }
  return false
}

export async function handleData(res: NextApiResponse, data: any) {
  data = data || { status: 'error', message: 'unhandled request' }
  res.status(data.status !== 'error' ? 200 : 500)
  res.json(data)
}

export function handleError(res: NextApiResponse, error: string | Error) {
  console.error(error)
  res.status(500).json({
    status: 'error',
    message: 'an error occurred processing request',
  })
}

export async function getPostList(postsTable: any) {
  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
      .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
      })
      .filter(Boolean)

  const { users } = await getNotionUsers(Array.from(authorsToGet))

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id])
    post.Image = getNotionImageUrl(post.Image, post.id)  
  })

  return posts
}

export const getNotionImageUrl = (imageString: string | null, pageId: string): string | null => {
  if (!imageString) return null;

  return `https://www.notion.so/image/${encodeURIComponent(imageString)}?table=block&id=${pageId}&cache=v2`;
}
