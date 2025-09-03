import { base } from '../base';
import { dbProvider } from '../middlewares/db-provider';

export const publicProcedure = base.use(dbProvider);
