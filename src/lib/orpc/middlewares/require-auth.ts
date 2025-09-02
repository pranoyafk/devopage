import { base } from '../base';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';

export const requireAuth = base.middleware(async ({ errors, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.session) {
    throw errors.UNAUTHORIZED();
  }

  return next({
    context: {
      session,
    },
  });
});
