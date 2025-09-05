import { orpc } from '@/lib/orpc';
import { getQueryClient } from '../get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { FeedSection } from './_components/feed';

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(orpc.posts.all.queryOptions());

  return (
    <main className="space-y-10">
      <section className="mx-auto my-6 max-w-xl space-y-6 px-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FeedSection />
        </HydrationBoundary>
      </section>
    </main>
  );
}
