import type { SelectPostSchemaWithUser } from '@/lib/db/schemas';

export function PostCard({ post }: { post: SelectPostSchemaWithUser }) {
  return <div className="">{post.content}</div>;
}
