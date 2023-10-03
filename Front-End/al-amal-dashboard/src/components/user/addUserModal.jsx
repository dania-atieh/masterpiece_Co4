import { useState } from 'react'

function AddUserModal({ onSubmit, error, useInfo, okeyText, onCancel, title }) {
  const [user, setUser] = useState({
    name: useInfo?.name || '',
    email: useInfo?.email || '',
    phoneNumber: useInfo?.phoneNumber || '',
    gender: useInfo?.gender || ''
  })

  const onSubmitForm = (e) => {
    e.preventDefault()
    onSubmit(user)
  }
  return (
    <form className=" p-4 flex flex-col gap-6 w-full" onSubmit={onSubmitForm}>
      <p className="text-xl font-semibold leading-7 text-gray-500">{title}</p>
      <div className="">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900  ">
          * Name
        </label>
        <input
          id="name"
          onChange={(e) => {
            setUser({
              ...user,
              name: e.target.value
            })
          }}
          value={user?.name}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
        />
      </div>
      <div className="">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900  ">
          * Email
        </label>
        <input
          id="email"
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value
            })
          }}
          value={user?.email}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
        />
      </div>
      <div className="">
        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900  ">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          onChange={(e) => {
            setUser({
              ...user,
              phoneNumber: e.target.value
            })
          }}
          value={user?.phoneNumber}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>
      {!useInfo ? (
        <div className="">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900  ">
            * Password
          </label>
          <input
            id="password"
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value
              })
            }}
            value={user?.password || ''}
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
      ) : null}

      <div className="">
        <p className="block mb-2 text-sm font-medium text-gray-900 ">Gender</p>
        <div className="flex justify-start items-center gap-6">
          <div className="flex items-center ">
            <input
              onChange={() => {
                setUser({
                  ...user,
                  gender: 'male'
                })
              }}
              id="default-radio-1"
              type="radio"
              checked={user?.gender == 'male'}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2  "
            />
            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900  ">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={user?.gender == 'female'}
              onChange={() => {
                setUser({
                  ...user,
                  gender: 'female'
                })
              }}
              id="default-radio-2"
              type="radio"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2  "
            />
            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900  ">
              Female
            </label>
          </div>
        </div>
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

export default AddUserModal
