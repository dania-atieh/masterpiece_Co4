import { useSelector } from 'react-redux'
import { getCounts } from '../redux/actions/generalActions'
import { useEffect, useState } from 'react'
import logo from '../assets/logo-empty.png'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { LiaUsersCogSolid } from 'react-icons/lia'
import { PiNewspaperClippingLight } from 'react-icons/pi'
import { BsUiChecksGrid } from 'react-icons/bs'

function Cards() {
  const { profile } = useSelector((state) => state.profile)
  const [countData, setCountData] = useState(null)

  const getData = async () => {
    const data = await getCounts()
    setCountData(data?.data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="flex flex-wrap gap-4 ">
      {!countData ? (
        <div className="w-full flex justify-center items-center mt-4">
          <img src={logo} alt="logo" className="w-24 animate-ping" />
        </div>
      ) : (
        <>
          <Card text="Users" number={countData?.users} Icon={<FiUsers color="green" />} />
          {profile.role === 'superAdmin' ? (
            <Card
              text="Admins"
              number={countData?.admins}
              Icon={<LiaUsersCogSolid color="green" />}
            />
          ) : null}
          <Card
            text="Orphans"
            number={countData?.orphans}
            Icon={<AiOutlineHeart color="green" />}
          />
          <Card
            text="Families"
            number={countData?.families}
            Icon={<AiOutlineHeart color="green" />}
          />
          <Card
            text="Bills"
            number={countData?.bills}
            Icon={<PiNewspaperClippingLight color="green" />}
          />
          <Card text="Courses" number={countData?.courses} Icon={<BsUiChecksGrid color="green" />} />
        </>
      )}
    </div>
  )
}

export default Cards

const Card = ({ text, number, Icon }) => {
  return (
    <div className="bg-white p-4 rounded-xl flex flex-col min-w-[200px] gap-2 flex-1">
      <p className="text-gray-400">{text}</p>
      <div className="flex justify-between items-center ">
        <div className="p-4 rounded-full bg-green-500/10 text-2xl">{Icon}</div>
        <p className="text-gray-400 font-bold">{number}</p>
      </div>
    </div>
  )
}
