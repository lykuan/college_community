'use client'

// * * This is just a demostration of delete modal, actual functionality may vary

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { TaskType } from '../schema'
import { Button } from '@/components/ui/button'
import { useDeletTask } from '@/lib/react-query/queriesAndMutations'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'

type DeleteProps = {
  task: TaskType
  isOpen: boolean
  showActionToggle: (open: boolean) => void
}

export default function DeleteDialog({
  task,
  isOpen,
  showActionToggle,
}: DeleteProps) {
  const qc = useQueryClient()
  const { mutateAsync: deleteTask } = useDeletTask()
  const handleDeleteTask = async () => {
    const result = await deleteTask(task._id)
    if (result.success) {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      toast({ title: result.message })
    } else toast({ title: result.message })
    showActionToggle(false)
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={showActionToggle}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定删除吗 ?</AlertDialogTitle>
          <AlertDialogDescription>
            这个行为不可逆转，确定删除任务吗<b>{task.title}</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <Button variant='destructive' onClick={handleDeleteTask}>
            删除
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
