function Table({ array, type, onDelete, onEdit }) {
  return (
    <div className="relative overflow-x-auto mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap capitalize">
              {type} NAME
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              IS SELECTED
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Social Study
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {array?.map((orphan, _id) => (
            <tr
              key={orphan._id}
              className={`border-b border-b-slate-50 ${_id % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
                {orphan?.name}
              </th>
              <td className="flex px-6 py-4 justify-start items-center gap-4">
                <p>{orphan?.id_user ? `Yes / by (${orphan?.id_user?.name})` : 'No'}</p>
              </td>
              <td className="px-6 py-4  gap-4">
                <a
                  className="font-medium text-green-600 hover:underline bg-green-600/5 py-2 px-5 rounded"
                  target="_blank"
                  href={orphan?.socialStudyUrl}
                  rel="noreferrer"
                >
                  View
                </a>
              </td>
              <td className="flex px-6 py-4  gap-4">
                <button
                  onClick={() => {
                    onEdit(orphan)
                  }}
                  className="font-medium text-sky-600 hover:underline bg-sky-600/5 py-2 px-5 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(orphan)
                  }}
                  className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
