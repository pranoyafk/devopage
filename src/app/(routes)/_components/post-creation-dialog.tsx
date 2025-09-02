'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  IconLoader2,
  IconLock,
  IconUsersGroup,
  IconWorld,
  type Icon,
  type ReactNode,
} from '@tabler/icons-react';
import type { User } from '@/lib/auth/client';
import { UserAvatar } from '@/components/user-avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import {
  POST_CONTENT_MAX_LENGTH,
  POST_CONTENT_MIN_LENGTH,
  VISIBILITY_VALUES,
  type Visibility,
} from '@/lib/constants/posts';
import { cn } from '@/lib/utils';
import { client } from '@/lib/orpc-client';
import { safe } from '@orpc/client';
import { toast } from 'sonner';

export function PostCreationDialog({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const [content, setContent] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [visibility, setVisibility] = useState<Visibility>('public');
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const isValid =
    content.length <= POST_CONTENT_MAX_LENGTH &&
    content.length >= POST_CONTENT_MIN_LENGTH;

  function onSubmit() {
    startTransition(async () => {
      const { error } = await safe(
        client.posts.create({
          authorId: user.id,
          content,
          visibility,
        })
      );

      if (error) {
        toast.error(error.message);
      } else {
        setDialogOpen(false);
        setContent('');
      }
    });
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-card gap-0 p-0">
        <DialogHeader className="items-start border-b px-4 py-3">
          <DialogTitle className="text-lg">Create New Post</DialogTitle>
          <DialogDescription className="text-muted-foreground text-start text-sm">
            Share your thoughts with your audience.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {/* Header */}
          <div className="grid">
            <div className="flex gap-3">
              <UserAvatar className="h-10 w-10" user={user} />
              <div className="flex flex-col">
                <h3 className="text-[15px]">{user.name}</h3>
                <span className="text-muted-foreground text-sm">@pranoy</span>
              </div>

              <Select
                onValueChange={(value: Visibility) => setVisibility(value)}
                defaultValue="public"
                disabled={isPending}
              >
                <SelectTrigger className="ml-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VISIBILITY_VALUES.map((value) => {
                    const visibilityIcons: Record<Visibility, Icon> = {
                      public: IconWorld,
                      private: IconLock,
                      followers: IconUsersGroup,
                    };
                    const VisibilityIcon = visibilityIcons[value];
                    return (
                      <SelectItem key={value} value={value}>
                        <VisibilityIcon size={16} aria-hidden="true" />
                        <span className="truncate capitalize">{value}</span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col">
            <Textarea
              className="min-h-24 resize-none border-none break-words break-all"
              disabled={isPending}
              placeholder="What's happening?"
              maxLength={POST_CONTENT_MAX_LENGTH}
              minLength={POST_CONTENT_MIN_LENGTH}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <span
              className={cn('mt-3 ml-auto block text-xs', {
                'text-yellow-500':
                  content.length >= POST_CONTENT_MAX_LENGTH - 10,
                'text-destructive': content.length === POST_CONTENT_MAX_LENGTH,
              })}
            >
              {content.length}/{POST_CONTENT_MAX_LENGTH}
            </span>
          </div>
        </div>
        <DialogFooter className="border-t px-4 py-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={isPending || !isValid}>
            {isPending && <IconLoader2 className="animate-spin" />}
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
