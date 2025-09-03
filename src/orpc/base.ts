import type { db } from '@/lib/db';
import { os } from '@orpc/server';

export const base = os
  .errors({
    UNAUTHORIZED: { message: 'Unauthorized access.' },
  })
  .$context<{
    headers: Headers;
    db?: typeof db;
  }>();
