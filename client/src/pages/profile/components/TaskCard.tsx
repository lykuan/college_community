import {
  status_options,
  priority_options,
  label_options,
} from '@/pages/tasks/filters'
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
const TaskCard = ({ task }) => {
  const taskLabel = label_options.find((item) => item.value === task.label)
  const taskPriority = priority_options.find(
    (item) => item.value === task.priority
  )
  const taskStatus = status_options.find((item) => item.value === task.status)
  return (
    <Card className='flex flex-col items-center w-full py-6 text-xs'>
      <CardTitle className='flex items-center gap-1  text-xs'>
        <div>{<taskLabel.icon />}</div>
        <div>
          <Badge className='text-xs '>{taskLabel.label}</Badge>
        </div>
        <div>{task.title}</div>
      </CardTitle>
      <CardContent className='py-4 text-xs'>{task.description}</CardContent>
      <CardFooter className='flex flex-col gap-2 text-xs'>
        <div className='gap-q flex items-center gap-1 text-xs'>
          {task.priority === 'low' && (
            <taskPriority.icon color='green' size={12} />
          )}
          {task.priority === 'medium' && (
            <taskPriority.icon color='blue' size={12} />
          )}
          {task.priority === 'high' && (
            <taskPriority.icon color='red' size={12} />
          )}
          <span>优先级:</span>
          <span>{taskPriority.label}</span>
        </div>
        <div className='flex items-center gap-1'>
          {task.status === 'done' && (
            <taskStatus.icon color='green' size={12} />
          )}
          {task.status === 'todo' && (
            <taskStatus.icon color='orange' size={12} />
          )}
          {task.status === 'doing' && (
            <taskStatus.icon color='blue' size={12} />
          )}
          {task.status === 'backlog' && (
            <taskStatus.icon color='red' size={12} />
          )}
          <span>状态:</span>
          <span>{taskStatus.label}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
