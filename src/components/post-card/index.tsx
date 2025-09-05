import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { UserAvatar } from '@/components/user-avatar';
import type { SelectPostSchemaWithUser } from '@/lib/db/schemas';
import { formatTimestamp } from '@/lib/format-timestamp';
import {
  IconBookmark,
  IconHeart,
  IconMessage2,
  IconPointFilled,
  IconRepeat,
} from '@tabler/icons-react';
import { ActionButton } from './actions';

export function PostCard({ post }: { post: SelectPostSchemaWithUser }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex gap-2">
          <UserAvatar user={post.author} />
          <div className="space-y-1">
            <h2 className="text-sm font-medium">{post.author.name}</h2>
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <p>{post.author.email}</p>
              <IconPointFilled size={10} />
              <p className="whitespace-nowrap">
                {formatTimestamp(post.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <ActionButton postId={post.id} authorId={post.authorId} />
      </CardHeader>
      <CardContent className="break-words">{post.content}</CardContent>
      <CardFooter className="flex items-center justify-around pt-0">
        <div className="text-muted-foreground flex w-full items-center justify-between">
          <Button size="sm" variant="ghost">
            <IconMessage2 />
            <span>1k</span>
          </Button>
          <Button size="sm" variant="ghost">
            <IconRepeat />
            <span>22</span>
          </Button>
          <Button size="sm" variant="ghost">
            <IconHeart />
            <span>3.4k</span>
          </Button>
          <Button size="sm" variant="ghost">
            <IconBookmark />
            <span>3</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
