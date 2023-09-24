import React from 'react'

function BackButton({ onClick }) {
  return (
    <div className="">
      <button
        type="button"
        className="rounded bg-slate-500 flex gap-3 justify-center items-center py-1 px-3 text-white w-fit"
        onClick={onClick}
      >
        back
      </button>
    </div>
  )
}

export default BackButton
