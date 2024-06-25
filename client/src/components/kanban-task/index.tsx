import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
const KanbanTask = () => {
  return (
    <>
      <div className='grid grid-cols-4 gap-4 px-4 py-6 md:px-6 md:py-8'>
        <div className='col-span-1 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>To Do</h2>
            <Button size='sm'>
              <PlusIcon className='h-4 w-4' />
              Add Task
            </Button>
          </div>
          <div className='space-y-2'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-base font-medium'>
                      Finish homepage design
                    </h3>
                    <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>Due in 3 days</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <PencilIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-base font-medium'>Write blog post</h3>
                    <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>Due in 5 days</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <PencilIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='col-span-1 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>In Progress</h2>
            <Button size='sm'>
              <PlusIcon className='h-4 w-4' />
              Add Task
            </Button>
          </div>
          <div className='space-y-2'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-base font-medium'>
                      Implement new feature
                    </h3>
                    <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>Due in 7 days</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <PencilIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='col-span-1 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Done</h2>
            <Button size='sm'>
              <PlusIcon className='h-4 w-4' />
              Add Task
            </Button>
          </div>
          <div className='space-y-2'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-base font-medium'>Refactor codebase</h3>
                    <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>Completed 2 days ago</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <PencilIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-base font-medium'>
                      Update documentation
                    </h3>
                    <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>Completed 1 week ago</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <PencilIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='col-span-1 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold'>Undone</h2>
            <Button size='sm'>
              <PlusIcon className='h-4 w-4' />
              Add Task
            </Button>
          </div>
          <div className='space-y-2'>
            <Card>
              <CardContent className='p-4'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-base font-medium'>
                      Prepare for meeting
                    </h3>
                    <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                      <CalendarIcon className='h-4 w-4' />
                      <span>Due 3 days ago</span>
                    </div>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button size='icon' variant='ghost'>
                      <PencilIcon className='h-4 w-4' />
                    </Button>
                    <Button size='icon' variant='ghost'>
                      <TrashIcon className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className='fixed bottom-4 right-4 md:bottom-6 md:right-6'
            size='sm'
          >
            <PlusIcon className='h-4 w-4' />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Fill in the details for your new task.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right' htmlFor='title'>
                Title
              </Label>
              <Input
                className='col-span-3'
                id='title'
                placeholder='Task title'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right' htmlFor='description'>
                Description
              </Label>
              <Textarea
                className='col-span-3'
                id='description'
                placeholder='Task description'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right' htmlFor='dueDate'>
                Due Date
              </Label>
              <Input
                className='col-span-3'
                id='dueDate'
                placeholder='Task due date'
                type='date'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right' htmlFor='status'>
                Status
              </Label>
              <Select className='col-span-3' defaultValue='todo' id='status'>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='todo'>To Do</SelectItem>
                  <SelectItem value='inProgress'>In Progress</SelectItem>
                  <SelectItem value='done'>Done</SelectItem>
                  <SelectItem value='undone'>Undone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className='mr-auto' variant='outline'>
              Cancel
            </Button>
            <Button type='submit'>Save Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
    </svg>
  )
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
      <path d='m15 5 4 4' />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  )
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  )
}

export default KanbanTask
