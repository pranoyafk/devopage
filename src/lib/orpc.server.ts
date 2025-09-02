import 'server-only';

import { createRouterClient } from '@orpc/server';
import { appRouter } from '@/lib/orpc';
import { headers } from 'next/headers';

globalThis.$client = createRouterClient(appRouter, {
  context: {
    headers: await headers(),
  },
});
