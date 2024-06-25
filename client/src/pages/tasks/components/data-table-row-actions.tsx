'use client'

import * as React from 'react'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { taskSchema } from '../schema'
import { label_options } from '../filters'
import EditDialog from '../modals/edit-modal'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import DeleteDialog from '../modals/delete-modal'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [dialogContent, setDialogContent] =
    React.useState<React.ReactNode | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState<boolean>(false)
  const task = taskSchema.parse(row.original)

  const handleEditClick = () => {
    setDialogContent(<EditDialog task={task} />)
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>打开菜单</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>动作</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild onClick={handleEditClick}>
            <DropdownMenuItem>
              <Pencil className='mr-2 h-4 w-4' />
              编辑
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className='text-red-600'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      <DeleteDialog
        task={task}
        isOpen={showDeleteDialog}
        showActionToggle={setShowDeleteDialog}
      />
    </Dialog>
  )
}
