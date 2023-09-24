import { deleteRequest, getRequest, updateRequest } from '../../API'
import { modalsActions } from '../reducers/modalsSlice'
import { profileActions } from '../reducers/profileSlice'
import { toast } from 'react-toastify'

export const getMeAction = () => async (dispatch) => {
  dispatch(profileActions.startLoading())
  try {
    const { data } = await getRequest(`auth/get-me`)
    dispatch(profileActions.updateMe(data))
    return
  } catch (error) {
    console.log(error)
  }
}
export const updateMeAction = (user) => async (dispatch) => {
  try {
    const response = await updateRequest(`auth/update-me`, user)
    if (response.status === 200) {
      dispatch(profileActions.updateMe(response.data))
      toast.success('User has been updated')
      return
    }
    dispatch(profileActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
export const updateMyPassword = (user) => async (dispatch) => {
  try {
    const response = await updateRequest(`auth/update-my-password`, user)
    if (response.status === 200) {
      dispatch(modalsActions.closeModals())
      localStorage.setItem('token', response?.data?.token)
      toast.success('Password has been updated')
      dispatch(profileActions.setError(null))
      return
    }
    dispatch(profileActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

export const deleteMeAction = (callback) => async (dispatch) => {
  try {
    const response = await deleteRequest(`auth/delete-me`)
    if (response.status === 204) {
      dispatch(modalsActions.closeModals())
      localStorage.removeItem('token')
      toast.success('User has been Deleted')
      dispatch(profileActions.setError(null))
      callback()
      return
    }
    dispatch(profileActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
