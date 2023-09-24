import { deleteRequest, getRequest, postRequest, updateRequest } from '../../API'
import { modalsActions } from '../reducers/modalsSlice'
import { usersActions } from '../reducers/usersSlice'
import { toast } from 'react-toastify'

export const getUsersAction = () => async (dispatch) => {
  dispatch(usersActions.startLoading())//indicates that the data is being fetched startLoading = true
  try {
    const { data } = await getRequest(`admin/get-users`)//HTTP request
    dispatch(usersActions.getUsers(data))
    return
  } catch (error) {
    console.log(error)
  }
}

export const addUserAction = (user) => async (dispatch) => {
  try {
    const response = await postRequest(`admin/add-user/`, user)
    if (response.status === 200) {
      dispatch(usersActions.addUser(response.data?.data?.user))
      dispatch(modalsActions.closeModals())
      toast.success('User has been added')
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
export const updateUserAction = (user) => async (dispatch) => {
  try {
    const response = await updateRequest(`admin/update-user/${user.userId}`, user)//patch, user here is the updated data
    if (response.status === 200) {
      dispatch(usersActions.updateUser(response.data?.data?.user))
      dispatch(modalsActions.closeModals())
      toast.success('User has been updated')
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
export const deleteUserAction = (userId) => async (dispatch) => {
  try {
    const response = await deleteRequest(`admin/delete-user/${userId}`)
    if (response.status === 204) {
      dispatch(usersActions?.deleteUser(userId))
      dispatch(modalsActions.closeModals())
      toast.success('User has been deleted')
      dispatch(usersActions.setError(null))
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

// ===

export const addSponsoredToUser = (obj, callback) => async (dispatch) => {
  try {
    const response = await updateRequest(`assign/add-sponsor-${obj.type}`, obj)
    if (response.status === 200) {
      dispatch(usersActions.updateUser(response.data?.data?.user))
      callback(response.data?.data?.user)
      toast.success(`${obj.type} has been added to user`)
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

export const deleteSponsoredFromUser = (obj, callback) => async (dispatch) => {
  try {
    const response = await updateRequest(`assign/remove-sponsor-${obj.type}`, obj)
    if (response.status === 200) {
      dispatch(usersActions.updateUser(response.data?.data?.user))
      callback(response.data?.data?.user)
      toast.success(`${obj.type} has been deleted from user`)
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

export const addCourseToUser = (obj, callback) => async (dispatch) => {
  try {
    const response = await updateRequest(`assign/add-user-to-course`, obj)
    if (response.status === 200) {
      dispatch(usersActions.updateUser(response.data?.data?.user))
      callback(response.data?.data?.user)
      toast.success(`Course has been added to user`)
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

export const deleteCourseFromUser = (obj, callback) => async (dispatch) => {
  try {
    const response = await updateRequest(`assign/delete-user-from-course`, obj)
    if (response.status === 200) {
      dispatch(usersActions.updateUser(response.data?.data?.user))
      callback(response.data?.data?.user)
      toast.success(`Course has been deleted from user`)
      return
    }
    dispatch(usersActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
