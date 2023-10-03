import { useState } from 'react'
import UploadFile from '../sponsored/UploadFile'

function BillsModal({ onSubmit, error, useInfo, okeyText, onCancel, title }) {
  const [info, setInfo] = useState({
    description: useInfo?.description || '',
    billUrl: useInfo?.billFileUrl || '',
    amount: useInfo?.payments || ''
  })

  const onSubmitForm = (e) => {
    e.preventDefault()
    onSubmit(info)
  }
  return (
    <form className=" p-4 flex flex-col gap-6 w-full" onSubmit={onSubmitForm}>
      <p className="text-xl font-semibold leading-7 text-gray-500">{title}</p>
      <div className="">
        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900  ">
          * Bill Amount {`(min 1)`}
        </label>
        <input
          value={info.amount}
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
          value={info.description}
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
          currentUrl={info.billUrl}
          type={'img'}
          onUrl={(url) => {
            setInfo({
              ...info,
              billUrl: url
            })
          }}
        />
      </div>
      {error ? (
        <div>
          <p className="text-sm text-pink-700">{error}</p>{' '}
        </div>
      ) : null}

      <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md  bg-[#5774cb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
        >
          {okeyText}
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BillsModal
