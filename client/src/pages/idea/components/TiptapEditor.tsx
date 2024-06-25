import { forwardRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]
interface QuillEditorProps {
  setContent: (key:string,content: string) => void
  value: string
}
const QuillEditor = forwardRef<ReactQuill, QuillEditorProps>(
  ({ setContent, value }, ref) => {
    return (
      <ReactQuill
        theme='snow'
        ref={ref}
        style={{ minHeight: '300px', marginBottom:"30px" }}
        value={value}
        onChange={(content) => {
          setContent('content',content)
        }}
        modules={modules}
        formats={formats}
      ></ReactQuill>
    )
  }
)

export default QuillEditor
