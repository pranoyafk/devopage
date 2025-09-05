'use client';

import { orpc } from '@/lib/orpc';
import { useSuspenseQuery } from '@tanstack/react-query';
import { PostCard } from '@/components/post-card';

export function FeedSection() {
  const { data } = useSuspenseQuery(orpc.posts.all.queryOptions());
  return data.map((post) => <PostCard key={post.id} post={post} />);
}
