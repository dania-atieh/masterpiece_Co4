import { toast } from 'react-toastify'
import { deleteRequest, getRequest, postRequest, updateRequest } from '../../API'
import { modalsActions } from '../reducers/modalsSlice'
import { sponsoredActions } from '../reducers/sponsoredSlice'
import { errorsMapper } from '../../utils/errorsMapper'

export const getOrphansAction = () => async (dispatch) => {
  dispatch(sponsoredActions.startLoading())
  try {
    const { data } = await getRequest(`sponsored/get-orphans`)
    dispatch(sponsoredActions.getOrphans(data))
    return
  } catch (error) {
    console.log(error)
  }
}

export const addOrphanAction = (orphan) => async (dispatch) => {
  try {
    const response = await postRequest(`sponsored/add-orphan/`, orphan)
    if (response.status === 200) {
      dispatch(sponsoredActions.addOrphan(response.data?.data?.orphan))
      dispatch(modalsActions.closeModals())
      toast.success('Orphan has been added')
      return
    }
    dispatch(
      sponsoredActions.setError(
        errorsMapper(response.response?.data?.message) ?? 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}

export const updateOrphanAction = (orphan) => async (dispatch) => {
  try {
    const response = await updateRequest(`sponsored/update-orphan/${orphan.orphanId}`, orphan)
    if (response.status === 200) {
      dispatch(sponsoredActions.updateOrphan(response.data?.data?.orphan))
      dispatch(modalsActions.closeModals())
      toast.success('Orphan has been updated')
      return
    }

    const errorMessage = response.response?.data?.message
    const errorValue = response.response?.data?.errorValue ?? ''
    dispatch(
      sponsoredActions.setError(
        errorMessage ? `${errorsMapper(errorMessage) + '  ' + errorValue}` : 'Something went wrong.'
      )
    )

    return
  } catch (error) {
    console.log(error)
  }
}
export const deleteOrphanAction = (orphanId) => async (dispatch) => {
  try {
    const response = await deleteRequest(`sponsored/delete-orphan/${orphanId}`)
    if (response.status === 204) {
      dispatch(sponsoredActions?.deleteOrphan(orphanId))
      dispatch(modalsActions.closeModals())
      toast.success('Orphan has been deleted')
      dispatch(sponsoredActions.setError(null))
      return
    }
    dispatch(
      sponsoredActions.setError(
        errorsMapper(response.response?.data?.message) ?? 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}

export const getFamiliesAction = () => async (dispatch) => {
  dispatch(sponsoredActions.startLoading())
  try {
    const { data } = await getRequest(`sponsored/get-families`)
    dispatch(sponsoredActions.getFamilies(data))
    return
  } catch (error) {
    console.log(error)
  }
}

export const addFamilyAction = (family) => async (dispatch) => {
  try {
    const response = await postRequest(`sponsored/add-family/`, family)
    if (response.status === 200) {
      dispatch(sponsoredActions.addFamily(response.data?.data?.family))
      dispatch(modalsActions.closeModals())
      toast.success('Family has been added')
      return
    }
    dispatch(
      sponsoredActions.setError(
        errorsMapper(response.response?.data?.message) ?? 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}

export const updateFamilyAction = (family) => async (dispatch) => {
  try {
    const response = await updateRequest(`sponsored/update-family/${family.familyId}`, family)
    if (response.status === 200) {
      dispatch(sponsoredActions.updateFamily(response.data?.data?.family))
      dispatch(modalsActions.closeModals())
      toast.success('Family has been updated')
      return
    }

    const errorMessage = response.response?.data?.message
    const errorValue = response.response?.data?.errorValue ?? ''
    dispatch(
      sponsoredActions.setError(
        errorMessage ? `${errorsMapper(errorMessage) + '  ' + errorValue}` : 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}
export const deleteFamilyAction = (familyId) => async (dispatch) => {
  try {
    const response = await deleteRequest(`sponsored/delete-family/${familyId}`)
    if (response.status === 204) {
      dispatch(sponsoredActions?.deleteFamily(familyId))
      dispatch(modalsActions.closeModals())
      toast.success('Family has been deleted')
      dispatch(sponsoredActions.setError(null))
      return
    }
    dispatch(
      sponsoredActions.setError(
        errorsMapper(response.response?.data?.message) ?? 'Something went wrong.'
      )
    )
    return
  } catch (error) {
    console.log(error)
  }
}
