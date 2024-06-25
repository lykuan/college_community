import ConfirmDialog from './alert-dialog'
import { Trash } from 'lucide-react'
import { Button } from '../ui/button'

const DeleteDialog = ({ title, content, handleDeleteConfirm }) => {
  return (
    <ConfirmDialog
      title={title}
      content={content}
      triggerChild={
        <Button  size='icon' className='bg-transparent hover:bg-transparent'>
          <Trash className='h-3.5 w-3.5 text-red-500' strokeWidth='1px' />
        </Button>
      }
      handleConfirm={handleDeleteConfirm}
    />
  )
}

export default DeleteDialog
