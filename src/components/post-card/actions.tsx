'use client';
import type { SelectPostSchema } from '@/lib/db/schemas';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  IconArchive,
  IconDots,
  IconEdit,
  IconLoader2,
  IconTrash,
} from '@tabler/icons-react';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orpc } from '@/lib/orpc';
import { toast } from 'sonner';
import { Authenticated } from '../shared/authenticated';

export function ActionButton({
  postId,
  authorId,
}: {
  postId: SelectPostSchema['id'];
  authorId: SelectPostSchema['authorId'];
}) {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isPending: isDeletePostPending } = useMutation(
    orpc.posts.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: orpc.posts.all.queryKey(),
        });
      },
      onError: (err) => toast.error(err.message || 'Internal Server Error'),
    })
  );
  const isDisable = isDeletePostPending;
  return (
    <Authenticated>
      {(user) =>
        user.id === authorId && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <IconDots />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled={isDisable}>
                <IconEdit />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem disabled={isDisable}>
                <IconArchive />
                Archive
              </DropdownMenuItem>

              <DropdownMenuItem
                disabled={isDisable}
                onSelect={(e) => {
                  e.preventDefault();
                  deletePost({ postId });
                }}
                variant="destructive"
              >
                {isDeletePostPending ? (
                  <IconLoader2 className="animate-spin" />
                ) : (
                  <IconTrash />
                )}
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </Authenticated>
  );
}
