import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCommunity } from '@/lib/react-query/queriesAndMutations'
import { toast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'


const editSchema = z.object({
  title: z.string().min(1, { message: 'Title Required' }),
  description: z.string().min(1, { message: 'descripiton Required' }),
})

type editSchemaType = z.infer<typeof editSchema>

const CreateCommunity = () => {
  const { mutateAsync: createCommunity } = useCreateCommunity()
  const [community, setCommunity] = useState({ name: '', description: "" })
  const qc = useQueryClient()
  async function onSubmit() {
    const result = await createCommunity(community)
    console.log(result)
    if (result.success) {
      toast({
        title: result.message
      })
      qc.invalidateQueries({ queryKey: ['userCommunities'] })
    } else {
      toast({ title: result.message })
    }
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>创建社区</DialogTitle>
      </DialogHeader>
      <div className='py-4'>
        <form className='grid gap-4'>
          <label htmlFor="">社区名</label>
         
          <Input value={community.name} name="name" onChange={(e) => setCommunity({ ...community, name: e.target.value })}></Input>
          <label htmlFor="description">描述</label>
          <Textarea value={community.description} name="description" onChange={(e) => setCommunity({ ...community, description: e.target.value })}></Textarea>
          <Button onClick={() => onSubmit()} type='button' className='mt-2 w-full'>
            创建
          </Button>
        </form>
      </div>
    </>
  )
}

export default CreateCommunity
