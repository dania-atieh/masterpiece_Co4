import { toast } from 'react-toastify'
import { deleteRequest, getRequest, updateRequest } from '../../API'
import { billsActions } from '../reducers/billsSlice'
import { modalsActions } from '../reducers/modalsSlice'

export const getBillsAction = () => async (dispatch) => {
  dispatch(billsActions.startLoading())
  try {
    const { data } = await getRequest(`sponsored/get-bills`)
    dispatch(billsActions.getBills(data))
    return
  } catch (error) {
    console.log(error)
  }
}

export const updateBillAction = (bill) => async (dispatch) => {
  try {
    const response = await updateRequest(`sponsored/update-bill/${bill.billId}`, bill)
    if (response.status === 200) {
      dispatch(billsActions.updateBill(response.data?.data?.bill))
      dispatch(modalsActions.closeModals())
      toast.success('Bill has been updated')
      return
    }
    dispatch(billsActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}

export const deleteBillAction = (billId) => async (dispatch) => {
  try {
    const response = await deleteRequest(`sponsored/delete-bill/${billId}`)
    if (response.status === 204) {
      dispatch(billsActions?.deleteBill(billId))
      dispatch(modalsActions.closeModals())
      toast.success('Bill has been deleted')
      return
    }
    dispatch(billsActions.setError(response.response?.data?.message ?? 'Something went wrong.'))
    return
  } catch (error) {
    console.log(error)
  }
}
