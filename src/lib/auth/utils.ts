import { headers } from 'next/headers';
import { auth } from './server';
import { cache } from 'react';

export const getAuthSession = cache(async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session: data?.session,
    user: data?.user,
  };
});
