import { deleteRequest, getRequest, postRequest, updateRequest } from '../../API'
import { modalsActions } from '../reducers/modalsSlice'
import { adminsActions } from '../reducers/adminsSlice'
import { toast } from 'react-toastify'
import { errorsMapper } from '../../utils/errorsMapper'

export const getAdminsAction = () => async (dispatch) => {
  dispatch(adminsActions.startLoading())
  try {
    const { data } = await getRequest(`admin/get-admins`)
    dispatch(adminsActions.getAdmins(data))
    return
  } catch (error) {
    console.log(error)
  }
}

export const addAdminAction = (admin) => async (dispatch) => {
  try {
    const response = await postRequest(`admin/add-admin/`, admin)
    if (response.status === 200) {
      dispatch(adminsActions.addAdmin(response.data?.data?.user))
      dispatch(modalsActions.closeModals())
      toast.success('Admin has been added')
      return
    }
    dispatch(
      adminsActions.setError(
        errorsMapper(response.response?.data?.message) ?? 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}
export const updateAdminAction = (admin) => async (dispatch) => {
  try {
    const response = await updateRequest(`admin/update-admin/${admin.adminId}`, admin)
    if (response.status === 200) {
      dispatch(adminsActions.updateAdmin(response.data?.data?.user))
      dispatch(modalsActions.closeModals())
      toast.success('Admin has been updated')
      return
    }
    const errorMessage = response.response?.data?.message
    const errorValue = response.response?.data?.errorValue ?? ''
    dispatch(
      adminsActions.setError(
        errorMessage ? `${errorsMapper(errorMessage) + '  ' + errorValue}` : 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}
export const deleteAdminAction = (adminId) => async (dispatch) => {
  try {
    const response = await deleteRequest(`admin/delete-admin/${adminId}`)
    if (response.status === 204) {
      dispatch(adminsActions?.deleteAdmin(adminId))
      dispatch(modalsActions.closeModals())
      toast.success('Admin has been deleted')
      dispatch(adminsActions.setError(null))
      return
    }
    dispatch(
      adminsActions.setError(
        errorsMapper(response.response?.data?.message) ?? 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}
