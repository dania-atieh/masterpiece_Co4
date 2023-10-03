import Sidebar from './sidebar'
import Header from './header'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMeAction } from '../../redux/actions/myActions'
import logo from '../../assets/logo-empty.png'

function Layout() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(getMeAction())
  }, [])

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="bg-[#eef1fa] w-full h-screen ">
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <img src={logo} alt="logo" className="w-24 animate-ping" />
          </div>
        ) : (
          <div className="w-full h-screen px-10 py-2 gap-6 flex flex-col overflow-auto">
            <div>
              <Header />
            </div>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  )
}

export default Layout
