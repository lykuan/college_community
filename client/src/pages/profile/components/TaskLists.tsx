import TaskCard from './TaskCard'

const TaskLists = ({ tasks }) => {
  return (
    <div className='grid h-full w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  )
}

export default TaskLists
