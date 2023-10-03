import React from 'react'
import { useSelector } from 'react-redux'

const UsersTable = ({ users, onEdit, onDelete, onManage }) => {
  const { profile } = useSelector((state) => state.profile)
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                USER NAME
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, _id) => (
              <tr
                key={user._id}
                className={`border-b border-b-slate-50 ${_id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  w-full"
                >
                  {user?.name}
                </th>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    onClick={() => {
                      onManage(user)
                    }}
                    className="font-medium text-green-600 hover:underline bg-green-600/5 py-2 px-5 rounded"
                  >
                    Manage
                  </button>
                  <button
                    onClick={() => {
                      onEdit(user)
                    }}
                    className="font-medium text-sky-600 hover:underline bg-sky-600/5 py-2 px-5 rounded"
                  >
                    Edit
                  </button>
                  {profile.role === 'superAdmin' && (
                    <button
                      onClick={() => {
                        onDelete(user)
                      }}
                      className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default UsersTable
