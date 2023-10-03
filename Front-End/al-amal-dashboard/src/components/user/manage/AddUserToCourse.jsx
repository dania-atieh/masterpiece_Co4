import { useState } from 'react'
import BackButton from './backbutton'
import DropdownWithSearch from './ddws'

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
          <div className="absolute left-3 top-3">
            <BackButton onClick={closeAdd} />
          </div>
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
            <div className=" flex justify-start items-center w-full  ">
              <DropdownWithSearch
                array={array}
                onSelect={(value) => {
                  setInfo({
                    ...info,
                    courseId: value
                  })
                }}
              />
            </div>
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
