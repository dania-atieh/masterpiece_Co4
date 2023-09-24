import React from 'react'
import search from '../../assets/search.svg'

function BillsHead({ onChangeSearch }) {
  return (
    <React.Fragment>
      <div className="w-full flex justify-between">
        <div className="flex gap-2 bg-white p-2 rounded ">
          <img src={search} alt="search" />
          <input
            type="text"
            placeholder="search"
            className="px-4 text-sm"
            onChange={(e) => {
              onChangeSearch(e.target.value)
            }}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default BillsHead
