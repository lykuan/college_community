import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, startOfDay, isEqual } from 'date-fns'
import { zhCN } from 'date-fns/locale'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calcDistanceToNow = (date: Date) => {
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale:zhCN
  })
}

export const formatDate = (data: Date) => {
  return format(data, 'yyyy/MM/dd')
}

export const groupMessagesByDate = (messages) => {
  // 创建一个空对象来存储分组后的消息
  const groupedMessages = {}

  // 遍历消息数组
  messages.forEach((message) => {
    // 获取消息的创建时间，并将其转换为日期对象的字符串形式
    const messageDate = format(startOfDay(new Date(message.createdAt)),"yyyy/MM/dd")

    // 如果该日期尚未存在于分组中，则将其作为键创建一个新的分组
    if (!groupedMessages[messageDate]) {
      groupedMessages[messageDate] = []
    }

    // 将消息添加到对应的日期分组中
    groupedMessages[messageDate].push(message)
  })

  return groupedMessages
}
