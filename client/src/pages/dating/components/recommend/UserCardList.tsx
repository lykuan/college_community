import { useState } from 'react'
import UserCard from './UserCard'
import DatingDetail from './DatingDetail'

const UserCardList = ({ users, mode }) => {
  const [cardShow, setCardShow] = useState(true)
  const [cardDetailId, setCardDetailId] = useState()
  return (
    <>
      {cardShow && (
        <ul className='grid w-full grid-cols-1 gap-3 md:grid-cols-3'>
          <h1 className='col-span-full mb-4 text-center'>
            {mode == 'liked'
              ? `心仪的用户 (${users?.length})`
              : `推荐用户 (${users?.length})`}
          </h1>
          {users?.map(
            (user, idx) =>
              cardShow && (
                <UserCard
                  hiddenCard={setCardShow}
                  showCardDetail={setCardDetailId}
                  id={idx}
                  key={idx}
                  user={user}
                />
              )
          )}
        </ul>
      )}
      <div className='m-auto grid h-full grid-cols-1 gap-2'>
        {users?.map(
          (user, idx) =>
            !cardShow &&
            cardDetailId == idx && (
              <DatingDetail
                key={idx}
                id={idx}
                hidden={setCardShow}
                user={user}
              />
            )
        )}
      </div>
    </>
  )
}

export default UserCardList
