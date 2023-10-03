import { useState } from 'react'
import UploadFile from '../../sponsored/UploadFile'

function MoreBills({ onClose, error, onAddBill, sponsord, username }) {
  const [info, setInfo] = useState({
    description: '',
    amount: '',
    billUrl: '',
    sponserdId: sponsord?._id
  })
  const addHandler = (e) => {
    e.preventDefault()
    onAddBill(info)
  }

  const isDisabled = !info.description || !info.amount || !info.billUrl

  return (
    <form onSubmit={addHandler} className="w-full">
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="selecet_user"
            className="block mb-2 text-sm font-medium text-gray-900 capitalize"
          >
            * Add More Bills for {sponsord?.name} From {username}
          </label>
        </div>

        <div className="">
          <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900  ">
            * Bill Amount {`(min 1)`}
          </label>
          <input
            onChange={(e) => {
              setInfo({
                ...info,
                amount: e.target.value
              })
            }}
            id="amount"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900  ">
            * Bill Description
          </label>
          <textarea
            onChange={(e) => {
              setInfo({
                ...info,
                description: e.target.value
              })
            }}
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900">* Bill Image</label>
          <UploadFile
            currentUrl={''}
            type={'img'}
            onUrl={(url) => {
              setInfo({
                ...info,
                billUrl: url
              })
            }}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-red-500 flex gap-3 justify-center items-center py-2 px-6 text-white w-fit"
          >
            Cancel
          </button>
          <button
            disabled={isDisabled}
            type="submit"
            className="disabled:bg-gray-500 rounded bg-green-500 flex gap-3 justify-center items-center py-2 px-6 text-white w-fit"
          >
            Save
          </button>
        </div>
        {error ? (
          <div>
            <p className="text-sm text-pink-700">{error}</p>
          </div>
        ) : null}
      </div>
    </form>
  )
}

export default MoreBills
