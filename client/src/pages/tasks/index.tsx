import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import ThemeSwitch from '@/components/shared/theme-switch'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import AddTaskDialog from './components/add-task'
import { useGetTasks } from '@/lib/react-query/queriesAndMutations'
import { IconBook } from '@tabler/icons-react'
import { DataTableLoading } from './components/data-table-skeleton'

export default function Tasks() {
  const [addTask, setAddTask] = useState(false)
  const { data: tasks, isLoading: loadingTasks } = useGetTasks()
  const handleAddTask = () => {
    setAddTask(true)
  }
  console.log(tasks)
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader className='py-4'>
        <IconBook size={40} />
        我的任务
        <div className='ml-auto flex items-center space-x-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={handleAddTask}>添加任务</Button>
            </DialogTrigger>
            {addTask && (
              <DialogContent>
                <AddTaskDialog />{' '}
              </DialogContent>
            )}
          </Dialog>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>我的任务</h2>
            <p className='text-muted-foreground'>这是你创建的任务列表</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {loadingTasks
            ?   (
                <DataTableLoading
                  columnCount={6}
                />
              )
            : tasks && <DataTable data={tasks} columns={columns} />}
        </div>
      </LayoutBody>
    </Layout>
  )
}
