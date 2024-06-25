import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SmileIcon } from 'lucide-react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

const EmojiPicker = ({ onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className='size-3.5 text-muted-foreground transition hover:text-foreground' />
      </PopoverTrigger>
      <PopoverContent className='w-full'>
        <Picker
          emojiSize={18}
          theme='light'
          data={data}
          maxFrequentRows={1}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
export default EmojiPicker
