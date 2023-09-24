import React, { useEffect, useState } from 'react'
import MyModal from '../components/MyModal'
import AddCourseModal from '../components/courses/addCourseModal'
import CoursesTable from '../components/courses/coursesTable'
import CoursesHead from '../components/courses/coursesHead'

import { useDispatch, useSelector } from 'react-redux'

import { modalsActions } from '../redux/reducers/modalsSlice'
import Loading from '../components/loading'
import {
  addCourseAction,
  deleteCourseAction,
  getCoursesAction,
  updateCourseAction
} from '../redux/actions/coursesActions'
import { coursesActions } from '../redux/reducers/coursesSlice'
import ViewUsersModal from '../components/courses/viewUsersModal'

function Courses() {
  const dispatch = useDispatch()

  const { courses, error, loading } = useSelector((state) => state.courses)
  const { modals } = useSelector((state) => state.modals)

  const [hypeCourses, sethypeCourses] = useState(courses)
  const [selectedCourse, setSelectedCourse] = useState({})

  useEffect(() => {
    dispatch(getCoursesAction())
  }, [])

  useEffect(() => {
    sethypeCourses(courses)
  }, [courses])

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(coursesActions.setError(null))
  }
  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }

  const onAddOpen = () => {
    openModal('addCourse')
  }
  const onEditOpen = (course) => {
    setSelectedCourse(course)
    openModal('editCourse')
  }

  const onDeleteOpen = (course) => {
    setSelectedCourse(course)
    openModal('deleteCourse')
  }

  const addHandler = (course) => {
    dispatch(addCourseAction(course))
  }

  const editHandler = (course) => {
    dispatch(
      updateCourseAction({
        ...course,
        courseId: selectedCourse._id
      })
    )
  }
  const deleteHandler = () => {
    dispatch(deleteCourseAction(selectedCourse._id))
  }

  const onChangeSearch = (value) => {
    sethypeCourses(
      courses.filter((course) =>
        course.name?.toLowerCase().trim().includes(value?.toLowerCase().trim())
      )
    )
  }

  const onViewUsersOpen = (course) => {
    setSelectedCourse(course)
    openModal('viewUsers')
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full gap-6">
          <CoursesHead onChangeSearch={onChangeSearch} onAddOpen={onAddOpen} />
          <CoursesTable
            array={hypeCourses}
            onEdit={onEditOpen}
            onDelete={onDeleteOpen}
            onViewUsers={onViewUsersOpen}
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.addCourse}
            wide
            component={
              <AddCourseModal
                useInfo={null}
                onSubmit={addHandler}
                okeyText="Add"
                onCancel={closeModal}
                title="Fill in Course's Info"
                error={error}
              />
            }
            okeyText="Add"
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.editCourse}
            wide
            component={
              <AddCourseModal
                useInfo={selectedCourse}
                onSubmit={editHandler}
                okeyText="Update"
                onCancel={closeModal}
                title="Update Course's Info"
                error={error}
              />
            }
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.viewUsers}
            hasFooter
            hasOkay
            onOkay={closeModal}
            component={
              <ViewUsersModal useInfo={selectedCourse} onCancel={closeModal} error={error} />
            }
          />
          <MyModal
            hasBody
            hasX
            hasTitle
            hasDescription
            hasCancel
            hasOkay
            hasFooter
            canHideWhenClickOutSide
            onClose={closeModal}
            onCancel={closeModal}
            onOkay={deleteHandler}
            isOpen={modals.deleteCourse}
            title="Delete Course"
            description="This action will delete this Course, unconnect with users associated, are you sure ?"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Courses
