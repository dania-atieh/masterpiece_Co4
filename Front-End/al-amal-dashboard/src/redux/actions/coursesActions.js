import { toast } from 'react-toastify'
import { deleteRequest, getRequest, postRequest, updateRequest } from '../../API'
import { coursesActions } from '../reducers/coursesSlice'
import { modalsActions } from '../reducers/modalsSlice'

export const getCoursesAction = () => async (dispatch) => {
  dispatch(coursesActions.startLoading())
  try {
    const { data } = await getRequest(`course/get-courses`)
    dispatch(coursesActions.getCourses(data))
    return
  } catch (error) {
    console.log(error)
  }
}
export const addCourseAction = (course) => async (dispatch) => {
  try {
    const response = await postRequest(`course/add-course`, course)
    if (response.status === 200) {
      dispatch(coursesActions.addCourse(response.data?.data?.course))
      dispatch(modalsActions.closeModals())
      toast.success('Course has been added')
      return
    }
    dispatch(coursesActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
  } catch (error) {
    console.log(error)
  }
}

export const updateCourseAction = (course) => async (dispatch) => {
  try {
    const response = await updateRequest(`course/update-course/${course.courseId}`, course)
    if (response.status === 200) {
      dispatch(coursesActions.updateCourse(response.data?.data?.course))
      dispatch(modalsActions.closeModals())
      toast.success('Course has been updated')
      return
    }
    dispatch(coursesActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

export const deleteCourseAction = (courseId) => async (dispatch) => {
  try {
    const response = await deleteRequest(`course/delete-course/${courseId}`)
    if (response.status === 204) {
      dispatch(coursesActions?.deletecCourse(courseId))
      dispatch(modalsActions.closeModals())
      toast.success('Course has been deleted')
      return
    }
    dispatch(coursesActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
