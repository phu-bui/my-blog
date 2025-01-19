import ScrollToHash from '@/components/ScrollToHash';
import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { Avatar, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'

import { baseURL } from '@/app/resources'
import { unstable_setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing';
import { formatDate } from '@/app/utils/formatDate'
import getBlogIndex from '@/lib/notion/getBlogIndex';
import { getPostList } from '@/lib/notion/utils';

interface BlogParams {
    params: { 
        slug: string;
		locale: string;
    };
}

export async function generateStaticParams() {
	const locales = routing.locales;
    
    // Create an array to store all posts from all locales
    const allPosts: { slug: string; locale: string }[] = [];

    // Fetch posts for each locale
	const postsTable = await getBlogIndex()
	const posts = getPostList(postsTable)
    for (const locale of locales) {
        allPosts.push(...(await posts).map(post => ({
            slug: post.slug,
            locale: locale,
        })));
    }

    return allPosts;
}

export async function generateMetadata({ params: { slug, locale } }: BlogParams) {
	const postsTable = await getBlogIndex()
	const posts = await getPostList(postsTable)
	let post = posts.find((post) => post.Slug === slug)

	if (!post) {
		return
	}

	let {
		Title: title,
		Date: publishedTime,
		summary: description,
		Image: image,
	} = post
	let ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/${locale}/blog/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
			twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export default async function Blog({ params }: BlogParams) {
	unstable_setRequestLocale(params.locale);
	const postsTable = await getBlogIndex()
	const posts = await getPostList(postsTable)
	let post = posts.find((post) => post.Slug === params.slug)

	if (!post) {
		notFound()
	}


	return (
		<Flex as="section"
			fillWidth maxWidth="xs"
			direction="column"
			gap="m">
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
						image: post.Image
							? post.Image
							: `https://${baseURL}/og?title=${post.Title}`,
							url: post.Image,
						author: {
							'@type': 'Person',
							// name: person.name,
						},
					}),
				}}
			/>
			<Button
				href={`/${params.locale}/blog`}
				variant="tertiary"
				size="s"
				prefixIcon="chevronLeft">
				Posts
			</Button>
			<Heading
				variant="display-strong-s">
				{post.Title}
			</Heading>
			<Flex
				gap="12"
				alignItems="center">
				{ post.Authors.length > 0 &&
					post.Authors.map((author, index) => (
					<Avatar
						key={index}
						size="s"
						src={author.profile_photo}/>
					)
				)}
				<Text
					variant="body-default-s"
					onBackground="neutral-weak">
					{formatDate(post.Date)}
				</Text>
			</Flex>
			{post.Image && (
				<SmartImage
					aspectRatio="16 / 9"
					radius="m"
					alt="image"
					src={post.Image}
					unoptimized
				/>
			)}
			{/* <Text variant="label-default-s">{post.Tag}</Text> */}
			<Flex
				as="article"
				direction="column"
				fillWidth>
				<CustomMDX source={post.preview} />
			</Flex>
			<ScrollToHash />
		</Flex>
	)
}
