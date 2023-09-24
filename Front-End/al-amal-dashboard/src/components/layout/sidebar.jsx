import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import logout from '../../assets/logout.svg'
import { useSelector } from 'react-redux'
import { AiOutlineHeart, AiOutlineHome } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { LiaUsersCogSolid } from 'react-icons/lia'
import { PiNewspaperClippingLight } from 'react-icons/pi'
import { BsUiChecksGrid } from 'react-icons/bs'

function Sidebar() {
  const navigate = useNavigate()

  const { profile } = useSelector((state) => state.profile)

  const removeLocalStorage = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="flex min-w-[230px] flex-col gap-4 bg-white h-full justify-between items-center">
      <div className="py-10">
        <Link to="/dashboard">
          <img src={logo} alt="logo" className="w-24" />
        </Link>
      </div>
      <div className="h-full flex justify-between flex-col py-10">
        <div className="flex flex-col gap-5 bg-white justify-between items-start ">
          <Item Icon={<AiOutlineHome />} to="/dashboard" text="Dashboard" />
          <Item Icon={<FiUsers />} to="/users" text="users" />
          <Item Icon={<AiOutlineHeart />} to="/sponsored" text="Sponsored" />
          <Item Icon={<PiNewspaperClippingLight />} to="/bills" text="Bills" />
          <Item Icon={<BsUiChecksGrid />} to="/courses" text="Courses" />
          {profile.role === 'superAdmin' && (
            <>
              <div className="w-full border-b" />
              <Item Icon={<LiaUsersCogSolid />} to="/admins" text="Admins" />
            </>
          )}
        </div>
        <button
          onClick={removeLocalStorage}
          className="rounded bg-[#5774cb] flex gap-3 justify-center items-center p-2"
        >
          <img src={logout} className="w-6 h-6" />
          <p className="text-center flex justify-center items-center text-white">Sign out</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

const Item = ({ Icon, to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-4 text-2xl justify-start items-center no-underline p-2 rounded w-full hover:bg-gray-300/20 ${
          isActive ? 'bg-indigo-600/5 text-[#5774cb]' : 'text-[#828f9b]'
        }`
      }
    >
      {Icon}
      <p className="text-base">{text}</p>
    </NavLink>
  )
}
