import { base } from '../base';
import { requireAuth } from '../middlewares/require-auth';

export const protectedProcedure = base.use(requireAuth);
