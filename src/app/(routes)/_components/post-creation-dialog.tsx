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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconLock, IconUsersGroup, IconWorld, type ReactNode } from '@tabler/icons-react';
import type { User } from '@/lib/auth/client';
import { UserAvatar } from '@/components/user-avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MAX_CONTENT, MIN_CONTENT } from '@/lib/constants/posts';
import { cn } from '@/lib/utils';

export function PostCreationDialog({ user, children }: { user: User; children: ReactNode }) {
  const [content, setContent] = useState<string>('');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gap-0 p-0">
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

              <Select defaultValue="public">
                <SelectTrigger className="ml-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem defaultChecked value="public">
                    <IconWorld size={16} aria-hidden="true" />
                    <span className="truncate">Public</span>
                  </SelectItem>
                  <SelectItem value="private">
                    <IconLock size={16} aria-hidden="true" />
                    <span className="truncate">Private</span>
                  </SelectItem>
                  <SelectItem value="followers">
                    <IconUsersGroup size={16} aria-hidden="true" />
                    <span className="truncate">Followers</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col">
            <Textarea
              className="min-h-24 resize-none border-none break-words break-all"
              placeholder="What's happening?"
              maxLength={MAX_CONTENT}
              minLength={MIN_CONTENT}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            <span
              className={cn('mt-3 ml-auto block text-xs', {
                'text-yellow-500': content.length >= MAX_CONTENT - 10,
                'text-destructive': content.length === MAX_CONTENT,
              })}
            >
              {content.length}/{MAX_CONTENT}
            </span>
          </div>
        </div>
        <DialogFooter className="border-t px-4 py-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Create Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
