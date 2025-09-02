import { os } from '@orpc/server';
import type { db } from '../db';

export const base = os
  .errors({
    UNAUTHORIZED: { message: 'Unauthorized access.' },
  })
  .$context<{
    headers: Headers;
    db?: typeof db;
  }>();
