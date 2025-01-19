import { Grid } from '@/once-ui/components';
import Post from './Post';
import getBlogIndex from '@/lib/notion/getBlogIndex';
import { postIsPublished } from '@/lib/blog-helpers';
import getNotionUsers from '@/lib/notion/getNotionUsers';
import { getNotionImageUrl } from '@/lib/notion/utils';

interface PostsProps {
    range?: [number] | [number, number];
    columns?: '1' | '2' | '3';
    locale: string;
    thumbnail?: boolean;
}

export async function Posts({
    range,
    columns = '1',
    locale = 'en',
    thumbnail = false
}: PostsProps) {
    const postsTable = await getBlogIndex()
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
	  post.Authors = post.Authors.map((id) => users[id].name)
      post.Image = getNotionImageUrl(post.Image, post.id)
	})

    const sortedBlogs = posts.sort((a, b) => {
        return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedBlogs;

    return (
        <>
            {displayedBlogs.length > 0 && (
                <Grid
                    columns={`repeat(${columns}, 1fr)`} mobileColumns="1col"
                    fillWidth marginBottom="40" gap="m">
                    {displayedBlogs.map((post) => (
                        <Post
                            key={post.Slug}
                            post={post}
                            thumbnail={thumbnail}
                        />
                    ))}
                </Grid>
            )}
        </>
    );
}
