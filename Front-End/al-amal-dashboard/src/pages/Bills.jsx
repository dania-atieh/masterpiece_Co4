import React, { useEffect, useState } from 'react'
import MyModal from '../components/MyModal'
import BillsTable from '../components/bill/billsTable'
import { useDispatch, useSelector } from 'react-redux'
import { modalsActions } from '../redux/reducers/modalsSlice'
import BillsHead from '../components/bill/BillsHead'
import BillsModal from '../components/bill/billsModal'
import { billsActions } from '../redux/reducers/billsSlice'
import { deleteBillAction, getBillsAction, updateBillAction } from '../redux/actions/billsActions'
import Loading from '../components/loading'

function Bills() {
  const dispatch = useDispatch()

  const { bills, error, loading } = useSelector((state) => state.bills)

  const { modals } = useSelector((state) => state.modals)

  const [hypeBills, sethypeBills] = useState(bills)
  const [selectedBill, setSelectedBill] = useState({})

  useEffect(() => {
    dispatch(getBillsAction())
  }, [])

  useEffect(() => {
    sethypeBills(bills)
  }, [bills])

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(billsActions.setError(null))
  }
  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }

  const onEditOpen = (bill) => {
    setSelectedBill(bill)
    openModal('editBill')
  }

  const onDeleteOpen = (bill) => {
    setSelectedBill(bill)
    openModal('deleteBill')
  }

  const editHandler = (bill) => {
    dispatch(
      updateBillAction({
        ...bill,
        billId: selectedBill._id
      })
    )
  }
  const deleteHandler = () => {
    dispatch(deleteBillAction(selectedBill._id))
  }

  const onChangeSearch = (value) => {
    sethypeBills(
      bills.filter((bill) => bill?.id_user?.name?.toLowerCase().trim().includes(value?.toLowerCase().trim()))
    )
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full gap-6">
          <BillsHead onChangeSearch={onChangeSearch} />
          <BillsTable bills={hypeBills} onEdit={onEditOpen} onDelete={onDeleteOpen} />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.editBill}
            component={
              <BillsModal
                useInfo={selectedBill}
                onSubmit={editHandler}
                okeyText="Update"
                onCancel={closeModal}
                title="Update Bill's Info"
                error={error}
              />
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
            isOpen={modals.deleteBill}
            title="Delete Bill"
            description="This action will delete this bill, remove it form associated user and remove connection between associated user and sponsored, are you sure ?"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Bills
