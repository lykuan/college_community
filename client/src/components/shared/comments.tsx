import Comment from './comment'

const Comments = ({ sid, comments = Array.from({ length: 4 }) }) => {
  return (
    <section className='w-full'>
      {comments.map((comment, idx) => {
        return <Comment key={idx} sid={sid} comment={comment} />
      })}
    </section>
  )
}
export default Comments
