import type { db } from '@/lib/db';
import { os } from '@orpc/server';

export const base = os
  .errors({
    UNAUTHORIZED: { message: 'Unauthorized access.' },
    NOT_FOUND: {
      message: 'Resource not found',
    },
  })
  .$context<{
    headers: Headers;
    db?: typeof db;
  }>();
