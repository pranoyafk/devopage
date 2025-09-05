import type { SidebarNavItemType } from '@/types/sidebar';
import {
  IconHome,
  IconCompass,
  IconBell,
  IconMessage,
} from '@tabler/icons-react';

export const navItems: SidebarNavItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: IconHome,
  },
  {
    label: 'Explore',
    href: '/explore',
    icon: IconCompass,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: IconMessage,
    badge: 3,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: IconBell,
    badge: 7,
  },
];
