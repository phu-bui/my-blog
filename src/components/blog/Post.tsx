"use client";

import { Flex, Heading, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
import styles from './Posts.module.scss';
import { formatDate } from '@/app/utils/formatDate';

interface PostProps {
    post: any;
    thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
    return (
        <SmartLink
            className={styles.hover}
            style={{
                textDecoration: 'none',
                margin: '0',
                height: 'fit-content',
            }}
            key={post.Slug}
            href={`/blog/${post.Slug}`}>
            <Flex
                position="relative"
                mobileDirection="column"
                fillWidth paddingY="12" paddingX="16" gap="32">
                {post.Image && thumbnail && (
                    <Flex
                        maxWidth={20} fillWidth
                        className={styles.image}>
                        <SmartImage
                            priority
                            sizes="640px"
                            style={{
                                cursor: 'pointer',
                                border: '1px solid var(--neutral-alpha-weak)'
                            }}
                            radius="m"
                            src={post.Image}
                            alt={'Thumbnail of ' + post.Title}
                            aspectRatio="16 / 9"
                        />
                    </Flex>
                )}
                <Flex
                    position="relative"
                    fillWidth gap="8"
                    direction="column" justifyContent="center">
                    <Heading
                        as="h2"
                        variant="heading-strong-l"
                        wrap="balance">
                        {post.Title}
                    </Heading>
                    <Text
                        variant="label-default-s"
                        onBackground="neutral-weak">
                        {formatDate(post.Date, false)}
                    </Text>
                    { post.Tag &&
                        <Tag
                            className="mt-8"
                            label={post.Tag}
                            variant="neutral" />
                    }
                </Flex>
            </Flex>
        </SmartLink>
    );
}