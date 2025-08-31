import type { SidebarNavItemType } from '@/types/sidebar';
import {
  LucideHome,
  LucideCompass,
  LucideFlame,
  LucideTrophy,
  LucideMessageSquare,
  LucideBell,
  LucideBookmark,
} from 'lucide-react';

export const navItems: SidebarNavItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: LucideHome,
  },
  {
    label: 'Explore',
    href: '/explore',
    icon: LucideCompass,
  },
  {
    label: 'Trending',
    href: '/trending',
    icon: LucideFlame,
  },
  {
    label: 'Challenges',
    href: '/challenges',
    icon: LucideTrophy,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: LucideMessageSquare,
    badge: 3,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: LucideBell,
    badge: 7,
  },
  {
    label: 'Bookmarks',
    href: '/bookmarks',
    icon: LucideBookmark,
  },
];
