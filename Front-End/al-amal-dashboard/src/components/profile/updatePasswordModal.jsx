import { useState } from 'react'

function UpdatePasswordModal({ onSubmit, error, onCancel }) {
  const [user, setUser] = useState({
    passwordCurrent: '',
    password: ''
  })

  const onSubmitForm = (e) => {
    e.preventDefault()
    onSubmit(user)
  }
  return (
    <form className=" p-4 flex flex-col gap-6 w-full" onSubmit={onSubmitForm}>
      <p className="text-xl font-semibold leading-7 text-gray-500">Update your password</p>
      <div className="">
        <label htmlFor="c-password" className="block mb-2 text-sm font-medium text-gray-900  ">
          Current Password
        </label>
        <input
          id="c-password"
          onChange={(e) => {
            setUser({
              ...user,
              passwordCurrent: e.target.value
            })
          }}
          value={user?.passwordCurrent}
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
        />
      </div>
      <div className="">
        <label htmlFor="n-password" className="block mb-2 text-sm font-medium text-gray-900  ">
          New Password
        </label>
        <input
          id="n-password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value
            })
          }}
          value={user.password}
          type="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
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
          Update
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

export default UpdatePasswordModal
