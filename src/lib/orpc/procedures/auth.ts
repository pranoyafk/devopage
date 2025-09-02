import { requireAuth } from '../middlewares/require-auth';
import { publicProcedure } from './public';

export const protectedProcedure = publicProcedure.use(requireAuth);
