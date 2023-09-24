import React from 'react'

function Tabs({ tab, setTab }) {
  const isOrphans = tab == 'orphans'
  const isFamilies = tab == 'families'

  return (
    <div className="w-full flex gap-5">
      <div className="flex gap-3 w-full">
        <button
          onClick={() => {
            setTab('orphans')
          }}
          className={` p-5 justify-center items-center rounded text-center font-bold w-full flex-1 ${
            isOrphans ? ' bg-indigo-600/5 text-[#5774cb]' : 'bg-white text-black hover:bg-green-200'
          }`}
        >
          Orphans
        </button>
        <button
          onClick={() => {
            setTab('families')
          }}
          className={` p-5 justify-center items-center rounded text-center font-bold w-full flex-1 ${
            isFamilies ? ' bg-indigo-600/5 text-[#5774cb]' : 'bg-white text-black hover:bg-green-200'
          }`}
        >
          Families
        </button>
      </div>
    </div>
  )
}

export default Tabs
