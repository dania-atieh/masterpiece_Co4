import React from 'react'
import { IoChevronBack } from 'react-icons/io5'

function BackButton({ onClick }) {
  return (
    <div className="">
      <button
        type="button"
        // className="rounded bg-slate-400 flex justify-center items-center py-1 px-3 text-white w-fit"
        className="gap-2 inline-flex justify-center rounded-md bg-white  px-2 py-2 text-lg text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={onClick}
      >
        <IoChevronBack />
        <p className="text-sm">back</p>
      </button>
    </div>
  )
}

export default BackButton
