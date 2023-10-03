import { useState } from 'react'
import doneIcon from '../../../assets/done.svg'
import closeIcon from '../../../assets/close.svg'

const Tabel = ({ array, onDelete, onAddBill, type }) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 whitespace-nowrap capitalize">
              {type} Name
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {array?.map((orphan, _id) => (
            <TabelItem
              key={orphan._id}
              orphan={orphan}
              onDelete={onDelete}
              type={type}
              onAddBill={onAddBill}
              tabelId={_id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Tabel

const TabelItem = ({ orphan, onDelete, onAddBill, type, tabelId }) => {
  const [isSure, setIsSure] = useState(false)

  return (
    <tr className={`border-b border-b-slate-50 ${tabelId % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  ">
        {orphan?.name}
      </th>
      <td className="px-6 py-4 flex gap-4 ">
        {!isSure ? (
          <>
            <button
              onClick={() => {
                setIsSure(true)
              }}
              className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded whitespace-nowrap"
            >
              Remove {type}
            </button>
            {type !== 'course' && (
              <button
                onClick={() => {
                  onAddBill(orphan)
                }}
                className="font-medium text-green-600 hover:underline bg-green-600/5 py-2 px-5 rounded whitespace-nowrap"
              >
                Add More Bills
              </button>
            )}
          </>
        ) : (
          <div className="flex justify-start gap-2">
            <button
              onClick={() => {
                setIsSure(false)
              }}
              className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded"
            >
              <img src={closeIcon} alt="logo" className="w-5" />
            </button>
            <button
              onClick={() => {
                onDelete(orphan?._id)
              }}
              className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded"
            >
              <img src={doneIcon} alt="logo" className="w-5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
