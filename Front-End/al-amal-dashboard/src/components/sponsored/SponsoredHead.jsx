import React from 'react'
import search from '../../assets/search.svg'

function SponsoredHead({ onAddOpen, onChangeSearch, textAdd }) {
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
        <button
          onClick={onAddOpen}
          className="rounded bg-[#788cc7] flex gap-3 justify-center items-center py-2 px-6 text-white w-fit"
        >
          {textAdd}
        </button>
      </div>
    </React.Fragment>
  )
}

export default SponsoredHead
