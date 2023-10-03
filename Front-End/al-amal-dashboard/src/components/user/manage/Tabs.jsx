import React from 'react'

const Tabs = ({ tab, setTab }) => {
  return (
    <React.Fragment>
      {!tab && (
        <div className="flex gap-3 w-full flex-col justify-center items-center">
          {['orphans', 'families', 'courses'].map((tabName, _id) => (
            <button
              key={tabName}
              onClick={() => {
                setTab(tabName)
              }}
              className={`capitalize p-5 justify-center items-center rounded text-center font-bold
              text-black w-full flex-1 hover:bg-green-200 ${_id % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}
            >
              {tabName}
            </button>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}
export default Tabs
