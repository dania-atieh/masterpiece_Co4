import React from 'react'
import search from '../../assets/search.svg'
import { useSelector } from 'react-redux'

function UsersHead({ onAddOpen, onChangeSearch }) {
  const { profile } = useSelector((state) => state.profile)
  return (
    <React.Fragment>
      <div className="w-full flex justify-between">
        <div className="flex gap-2 bg-white p-2 rounded ">
          <img src={search} alt="search" />
          <input
            type="text"
            placeholder="search"
            className="px-4 text-sm"
            onChange={(e) => {
              onChangeSearch(e.target.value)
            }}
          />
        </div>
        {profile.role === 'superAdmin' && (
          <button
            onClick={onAddOpen}
            className="rounded bg-[#788cc7] flex gap-3 justify-center items-center py-2 px-6 text-white w-fit"
          >
            Add User
          </button>
        )}
      </div>
    </React.Fragment>
  )
}

export default UsersHead
