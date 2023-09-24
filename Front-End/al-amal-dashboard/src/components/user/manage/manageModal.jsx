import React, { useEffect, useState } from 'react'
import OrphansContent from './OrphansContent'
import FamiliesContent from './FamiliesContent'
import CoursesContent from './CoursesContent'
import Tabs from './Tabs'
import { useDispatch } from 'react-redux'
import { sponsoredActions } from '../../../redux/reducers/sponsoredSlice'

function ManageSponsoredModal({ useInfo, setUseInfo }) {
  const [tab, setTab] = useState('')

  const isOrphans = tab == 'orphans'
  const isFamilies = tab == 'families'
  const isCourses = tab == 'courses'
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(sponsoredActions.setError(null))
  }, [])

  return (
    <div className="min-h-[500px] h-[500px] flex justify-center items-start w-full flex-col overflow-y-auto pt-6 ">
      <Tabs tab={tab} setTab={setTab} />
      {isOrphans && <OrphansContent useInfo={useInfo} setUseInfo={setUseInfo} setTab={setTab} />}
      {isFamilies && <FamiliesContent useInfo={useInfo} setUseInfo={setUseInfo} setTab={setTab} />}
      {isCourses && <CoursesContent useInfo={useInfo} setUseInfo={setUseInfo} setTab={setTab} />}
    </div>
  )
}

export default ManageSponsoredModal
