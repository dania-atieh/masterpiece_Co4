import React, { useState, useRef, useEffect } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

const DropdownWithSearch = ({ array, onSelect }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownButtonRef = useRef(null)
  const dropdownMenuRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState('')
  const [modArray, setModArray] = useState(array)

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    setModArray(
      array.filter((item) => item.name?.toLowerCase().trim().includes(value?.toLowerCase().trim()))
    )
  }

  const handleClickOutside = (e) => {
    if (
      dropdownButtonRef.current &&
      !dropdownButtonRef.current.contains(e.target) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target)
    ) {
      setDropdownOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left  w-full ">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            onClick={handleButtonClick}
            ref={dropdownButtonRef}
          >
            <p>{selectedItem ? selectedItem : 'Select'} </p>
            <RiArrowDropDownLine
              className={`w-5 h-5 ml-2 -mr-1 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
            />
          </button>
        </span>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute left-0 z-50 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
          ref={dropdownMenuRef}
        >
          <div className="flex items-center p-2">
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {modArray.map((item) => (
              <p
                key={item._id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  onSelect(item._id)
                  setSelectedItem(item.name)
                  setDropdownOpen(false)
                  setSearchTerm('')
                  setModArray(array)
                }}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownWithSearch
