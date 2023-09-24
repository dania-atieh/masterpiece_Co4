import { useState } from 'react'
import BackButton from './backbutton'

const AddUserToCourse = ({ closeAdd, error, array, onAdd }) => {
  const [info, setInfo] = useState({
    courseId: ''
  })
  const addHandler = (e) => {
    e.preventDefault()
    onAdd(info)
  }

  const isDisabled = !info.courseId

  return (
    <form onSubmit={addHandler} className="w-full">
      {array?.length === 0 ? (
        <>
          <BackButton onClick={closeAdd} />
          <p className="text-sm text-red-400 mt-4">
            There is not any available Course to select, create one!
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="selecet_user"
              className="block mb-2 text-sm font-medium text-gray-900 capitalize"
            >
              * Select a Course
            </label>
            <select
              required
              onChange={(e) => {
                setInfo({
                  ...info,
                  courseId: e.target.value
                })
              }}
              id="selecet_user"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={''}>Select</option>
              {array.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={closeAdd}
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
      )}
    </form>
  )
}

export default AddUserToCourse
