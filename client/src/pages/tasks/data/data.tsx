import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'study',
    label: '学习',
  },
  {
    value: 'exercise',
    label: '锻炼',
  },
  {
    value: 'life',
    label: '生活',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'doing',
    label: 'Doing',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
]

export const priorities = [
  {
    label: '低',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: '适中',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: '高',
    value: 'high',
    icon: ArrowUpIcon,
  },
]
