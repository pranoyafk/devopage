import 'server-only';

import { createRouterClient } from '@orpc/server';
import { appRouter } from '@/lib/orpc';

globalThis.$client = createRouterClient(appRouter);
