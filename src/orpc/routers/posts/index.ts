import { createPost } from './create';
import { getAll } from './get-all';

export const postsRouter = {
  create: createPost,
  all: getAll,
};
