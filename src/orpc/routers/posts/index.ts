import { createPost } from './create';
import { deletePost } from './delete';
import { getAll } from './get-all';

export const postsRouter = {
  create: createPost,
  all: getAll,
  delete: deletePost,
};
