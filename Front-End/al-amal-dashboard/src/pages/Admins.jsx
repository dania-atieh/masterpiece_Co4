import React, { useEffect, useState } from 'react'
import MyModal from '../components/MyModal'
import AddAdminModal from '../components/admin/addAdminModal'
import Table from '../components/admin/table'
import { useDispatch, useSelector } from 'react-redux'
import {
  addAdminAction,
  deleteAdminAction,
  getAdminsAction,
  updateAdminAction
} from '../redux/actions/adminsActions'
import { modalsActions } from '../redux/reducers/modalsSlice'
import { adminsActions } from '../redux/reducers/adminsSlice'
import AdminsHead from '../components/admin/AdminsHead'
import Loading from '../components/loading'

function Admins() {
  const dispatch = useDispatch()

  const { admins, error, loading } = useSelector((state) => state.admins)
  const { modals } = useSelector((state) => state.modals)

  const [hypeAdmins, sethypeAdmins] = useState(admins)
  const [selectedAdmin, setSelectedAdmin] = useState({})

  useEffect(() => {
    dispatch(getAdminsAction())
  }, [])

  useEffect(() => {
    sethypeAdmins(admins)
  }, [admins])

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(adminsActions.setError(null))
  }
  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }

  const onAddOpen = () => {
    openModal('addAdmin')
  }
  const onEditOpen = (admin) => {
    setSelectedAdmin(admin)
    openModal('editAdmin')
  }

  const onDeleteOpen = (admin) => {
    setSelectedAdmin(admin)
    openModal('deleteAdmin')
  }

  const addHandler = (admin) => {
    dispatch(addAdminAction(admin))
  }

  const editHandler = (admin) => {
    dispatch(
      updateAdminAction({
        ...admin,
        adminId: selectedAdmin._id
      })
    )
  }
  const deleteHandler = () => {
    dispatch(deleteAdminAction(selectedAdmin._id))
  }

  const onChangeSearch = (value) => {
    sethypeAdmins(
      admins.filter((admin) =>
        admin.name?.toLowerCase().trim().includes(value?.toLowerCase().trim())
      )
    )
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full gap-6">
          <AdminsHead onChangeSearch={onChangeSearch} onAddOpen={onAddOpen} />

          <Table admins={hypeAdmins} onEdit={onEditOpen} onDelete={onDeleteOpen} />

          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.addAdmin}
            component={
              <AddAdminModal
                useInfo={null}
                onSubmit={addHandler}
                okeyText="Add"
                onCancel={closeModal}
                title="Fill in Admin's Info"
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
            isOpen={modals.editAdmin}
            component={
              <AddAdminModal
                useInfo={selectedAdmin}
                onSubmit={editHandler}
                okeyText="Update"
                onCancel={closeModal}
                title="Update Admin's Info"
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
            isOpen={modals.deleteAdmin}
            title="Delete Admin"
            description="This action will delete this admin, are you sure ?"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Admins
