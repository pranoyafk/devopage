import type { BottomTabItemType } from '@/types/bottom-tab';
import { LucideHome, LucideCompass, LucidePlus, LucideMessageCircle, LucideUser } from 'lucide-react';

export const bottomTabItems: BottomTabItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: LucideHome,
    badge: 0,
  },
  {
    label: 'Explore',
    href: '/explore',
    icon: LucideCompass,
    badge: 0,
  },
  {
    label: 'Create',
    href: '/create',
    icon: LucidePlus,
    badge: 0,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: LucideMessageCircle,
    badge: 3,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: LucideUser,
    badge: 0,
  },
];
