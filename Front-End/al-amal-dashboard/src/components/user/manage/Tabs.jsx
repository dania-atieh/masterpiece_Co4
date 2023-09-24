import React from 'react'

const Tabs = ({ tab, setTab }) => {
  return (
    <React.Fragment>
      {!tab && (
        <div className="flex gap-3 w-full flex-col justify-center items-center">
          <button
            onClick={() => {
              setTab('orphans')
            }}
            className={` p-5 justify-center items-center rounded text-center font-bold  text-black w-full flex-1 hover:bg-green-200 ${'bg-gray-200'}`}
          >
            Orphans
          </button>
          <button
            onClick={() => {
              setTab('families')
            }}
            className={` p-5 justify-center items-center rounded text-center font-bold  text-black w-full flex-1 hover:bg-green-200 ${' bg-gray-200'}`}
          >
            Families
          </button>
          <button
            onClick={() => {
              setTab('courses')
            }}
            className={` p-5 justify-center items-center rounded text-center font-bold  text-black w-full flex-1 hover:bg-green-200 ${' bg-gray-200'}`}
          >
            Courses
          </button>
        </div>
      )}
    </React.Fragment>
  )
}
export default Tabs
