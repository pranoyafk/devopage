import { env } from '@/lib/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas';

export const db = drizzle(postgres(env.DATABASE_URL), { schema });
