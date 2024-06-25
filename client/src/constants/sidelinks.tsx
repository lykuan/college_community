import {
  IconChartHistogram,
  IconChecklist,
  IconHexagonNumber1,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconMessages,
  IconSettings,
  IconUserShield,
  IconHome,
  IconHeart,
  IconFriends,
  IconBook2,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: '主页',
    label: '',
    href: '/',
    icon: <IconHome size={18} />,
  },
  {
    title: '知识分享',
    label: '',
    href: '/idea',
    icon: <IconBook2 size={18} />,
  },
  {
    title: '任务',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },

  {
    title: '校园交友',
    label: '',
    href: '/dating',
    icon: <IconFriends size={18} />,
  },
  {
    title: '用户设置',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
