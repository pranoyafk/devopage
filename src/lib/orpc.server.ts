import 'server-only';

import { createRouterClient } from '@orpc/server';
import { headers } from 'next/headers';
import { appRouter } from '@/orpc';

globalThis.$client = createRouterClient(appRouter, {
  context: async () => ({
    headers: await headers(),
  }),
});
