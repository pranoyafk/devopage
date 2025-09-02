import { os } from '@orpc/server';
import { db } from '@/lib/db';
import { env } from '@/lib/env';
import { headers } from 'next/headers';

export const base = os
  .errors({
    UNAUTHORIZED: { message: 'Unauthorized access.' },
  })
  .use(async ({ next }) =>
    next({
      context: {
        db,
        env,
        headers: await headers(),
      },
    })
  );
