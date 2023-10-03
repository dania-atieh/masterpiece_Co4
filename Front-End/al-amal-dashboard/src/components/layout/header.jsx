import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CgProfile } from 'react-icons/cg'

function Header() {
  const { profile } = useSelector((state) => state.profile)

  return (
    <div className="bg-white mt-2 p-2 rounded  flex justify-between ">
      <div className="flex gap-2 ml-4">
        <div className="flex gap-1 justify-center items-center">
          <p className={`text-sm`}>
            Hi, <strong>{profile.name}</strong>, Your Privilege is
          </p>
          <p
            className={`text-sm  ${
              profile.role === 'superAdmin' ? 'text-red-700' : 'text-blue-700'
            }`}
          >
            {`(${profile.role})`}
          </p>
        </div>
      </div>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center ${
            isActive ? 'bg-indigo-600/5 text-[#5774cb]' : 'text-[#828f9b]'
          }`
        }
      >
        <div className="rounded-md p-2 text-3xl hover:bg-gray-300/20">
          <CgProfile />
        </div>
      </NavLink>
    </div>
  )
}

export default Header
