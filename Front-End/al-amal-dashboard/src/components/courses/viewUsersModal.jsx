import React from 'react'

function ViewUsersModal({ useInfo }) {
  return (
    <div className=" p-4 flex flex-col gap-6 w-full"  >
      <p className="text-xl font-semibold leading-7 text-gray-500">Users subscribed to this course</p>
      <div className="flex w-full divide-y flex-col ">
        {useInfo.users.map((user) => (
          <p key={user._id} className='font-bold p-2 w-full'>{user.name}</p>
        ))}
      </div>
    </div>
  )
}

export default ViewUsersModal
