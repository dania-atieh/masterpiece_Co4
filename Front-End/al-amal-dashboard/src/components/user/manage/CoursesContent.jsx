import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabel from './tabel'
import { getCoursesNotSelected } from '../../../redux/actions/generalActions'
import Loading from '../../../components/loading'
import { usersActions } from '../../../redux/reducers/usersSlice'
import { addCourseToUser, deleteCourseFromUser } from '../../../redux/actions/usersActions'
import AddUserToCourse from './AddUserToCourse'
import BackButton from './backbutton'

const CoursesContent = ({ useInfo, setUseInfo, setTab }) => {
  const { error } = useSelector((state) => state.users)

  const [isAdd, setIsAdd] = useState(false)
  const dispatch = useDispatch()

  const openAdd = () => {
    setIsAdd(true)
  }
  const closeAdd = () => {
    dispatch(usersActions.setError(null))
    setIsAdd(false)
  }

  const onDeleteHandler = (id) => {
    const deleteCallBack = (responseInfo) => {
      setUseInfo(responseInfo)
    }
    dispatch(
      deleteCourseFromUser(
        {
          courseId: id,
          id_user: useInfo?._id
        },
        deleteCallBack
      )
    )
  }

  const onAddHandler = (info) => {
    const addCallBack = (responseInfo) => {
      setUseInfo(responseInfo)
      closeAdd()
    }
    dispatch(
      addCourseToUser(
        {
          ...info,
          id_user: useInfo?._id,
          coursenId: info.sponserdId
        },
        addCallBack
      )
    )
  }
  return (
    <div className="h-full w-full mt-4 flex flex-col gap-4">
      {isAdd ? (
        <AddUserCourse closeAdd={closeAdd} error={error} onAdd={onAddHandler} useInfo={useInfo} />
      ) : (
        <>
          <p className="w-full text-center">Manage Courses For {useInfo?.name}</p>
          <div className="absolute left-3 top-3">
            <BackButton
              onClick={() => {
                setTab('')
              }}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={openAdd}
              className="rounded bg-[#5774cb] flex gap-3 justify-center items-center py-2 px-6 text-white w-fit"
            >
              Add
            </button>
          </div>
          {useInfo?.courses?.length > 0 ? (
            <>
              <p className="text-sm">Courses associated with {useInfo?.name}</p>
              <Tabel
                type="course"
                array={useInfo?.courses}
                onDelete={onDeleteHandler}
                onManage={() => {}}
              />
            </>
          ) : (
            <p className="text-sm">No courses associated with {useInfo?.name}</p>
          )}
        </>
      )}
    </div>
  )
}

export default CoursesContent

const AddUserCourse = ({ closeAdd, error, onAdd, useInfo }) => {
  const [array, setArray] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    const data = await getCoursesNotSelected({ id_user: useInfo?._id })
    setArray(data?.data?.courses)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  return (
    <React.Fragment>
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Loading fullHeight={false} />
        </div>
      ) : (
        <AddUserToCourse closeAdd={closeAdd} array={array} error={error} onAdd={onAdd} />
      )}
    </React.Fragment>
  )
}
