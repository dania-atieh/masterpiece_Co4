import React from 'react'

const Table = ({ admins, onEdit, onDelete }) => {
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                ADMIN NAME
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Privilege
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin, _id) => (
              <tr
                key={admin._id}
                className={`border-b border-b-slate-50 ${
                  _id % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                  {admin?.name}
                </th>
                <td className="px-6 py-4">{admin?.role}</td>
                {admin?.role === 'superAdmin' ? (
                  <td className="px-6 py-4 flex gap-4">
                    <p className="text-xs text-red-400">{`(superAdmin cant not be changed)`}</p>
                  </td>
                ) : (
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => {
                        onEdit(admin)
                      }}
                      className="font-medium text-sky-600 hover:underline bg-sky-600/5 py-2 px-5 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(admin)
                      }}
                      className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default Table
