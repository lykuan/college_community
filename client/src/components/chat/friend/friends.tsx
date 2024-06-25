import Friend from './friend'

const Friends = ({ friends }) => {
  return (
    <ul
      role='list'
      className='flex h-full w-full flex-col items-center overflow-y-auto scrollbar'
    >
      {friends?.map((user, idx) => {
        return <Friend key={idx} user={user}></Friend>
      })}
    </ul>
  )
}

export default Friends
