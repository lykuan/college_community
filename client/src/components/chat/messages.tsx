import Message from './message'

const Messages = ({ messages, selectedUser }) => {
  return (
    <section className='flex flex-col gap-y-1'>
      {messages.map((message, idx) => {
        return (
          <Message
            message={message}
            selectedUser={selectedUser}
            key={idx}
          ></Message>
        )
      })}
    </section>
  )
}

export default Messages
