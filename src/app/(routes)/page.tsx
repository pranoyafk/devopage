import { orpc } from '@/lib/orpc';
import { getQueryClient } from '../get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { FeedSection } from './_components/feed';

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(orpc.posts.all.queryOptions());

  return (
    <section className="space-y-10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeedSection />
      </HydrationBoundary>
    </section>
  );
}
