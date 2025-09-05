import type { BottomTabItemType } from '@/types/bottom-tab';
import {
  IconCompass,
  IconHome,
  IconMessageCircle,
  IconPlus,
  IconUser,
} from '@tabler/icons-react';

export const bottomTabItems: BottomTabItemType[] = [
  {
    label: 'Home',
    href: '/',
    icon: IconHome,
    badge: 0,
    type: 'link',
  },
  {
    label: 'Explore',
    href: '/explore',
    icon: IconCompass,
    badge: 0,
    type: 'link',
  },
  {
    label: 'Create',
    icon: IconPlus,
    type: 'create',
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: IconMessageCircle,
    badge: 3,
    type: 'link',
  },
  {
    label: 'Profile',
    icon: IconUser,
    type: 'link',
    href: '/profile',
    badge: 0,
  },
];
