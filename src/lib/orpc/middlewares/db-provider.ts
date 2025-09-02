import { db } from '@/lib/db';
import { base } from '../base';

export const dbProvider = base.middleware(async ({ next, context }) => {
  const _db = context?.db ?? db;
  return next({
    context: {
      db: _db,
    },
  });
});
