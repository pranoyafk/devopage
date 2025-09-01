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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconLock, IconUsersGroup, IconWorld, type ReactNode } from '@tabler/icons-react';
import type { User } from '@/lib/auth/client';
import { UserAvatar } from '@/components/user-avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';

export function PostCreationDialog({ user, children }: { user: User; children: ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const Comp = isDesktop
    ? {
        Root: Dialog,
        Trigger: DialogTrigger,
        Content: DialogContent,
        Header: DialogHeader,
        Title: DialogTitle,
        Description: DialogDescription,
        Footer: DialogFooter,
        Close: DialogClose,
      }
    : {
        Root: Drawer,
        Trigger: DrawerTrigger,
        Content: DrawerContent,
        Header: DrawerHeader,
        Title: DrawerTitle,
        Description: DrawerDescription,
        Footer: DrawerFooter,
        Close: DrawerClose,
      };

  return (
    <Comp.Root>
      <Comp.Trigger asChild>{children}</Comp.Trigger>
      <Comp.Content className="bg-card max-h-screen gap-0 p-0 shadow-lg will-change-transform">
        <Comp.Header className="items-start border-b px-4 py-3">
          <Comp.Title className="text-lg">Create New Post</Comp.Title>
          <Comp.Description className="text-muted-foreground text-start text-sm">
            Share your thoughts with your audience.
          </Comp.Description>
        </Comp.Header>
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
              maxLength={280}
              minLength={10}
            />
            <span className="mt-3 ml-auto block text-xs">10/280</span>
          </div>
        </div>
        <Comp.Footer className="border-t px-4 py-3">
          <Comp.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Comp.Close>
          <Button>Create Post</Button>
        </Comp.Footer>
      </Comp.Content>
    </Comp.Root>
  );
}
