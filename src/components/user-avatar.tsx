import type { User } from '@/lib/auth/client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}
export function UserAvatar({ className, user }: { className?: string; user: User }) {
  return (
    <Avatar className={cn('h-8 w-8', className)}>
      {user.image ? <AvatarImage src={user.image} /> : <AvatarFallback>{getInitials(user.name)}</AvatarFallback>}
    </Avatar>
  );
}
