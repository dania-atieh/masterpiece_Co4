import React, { useEffect, useState } from 'react'
import MyModal from '../components/MyModal'
import AddUserModal from '../components/user/addUserModal'
import UsersTable from '../components/user/usersTable'
import { useDispatch, useSelector } from 'react-redux'
import {
  addUserAction,
  deleteUserAction,
  getUsersAction,
  updateUserAction
} from '../redux/actions/usersActions'
import { modalsActions } from '../redux/reducers/modalsSlice'
import { usersActions } from '../redux/reducers/usersSlice'
import UsersHead from '../components/user/UsersHead'
import { sponsoredActions } from '../redux/reducers/sponsoredSlice'
import ManageSponsoredModal from '../components/user/manage/manageModal'
import Loading from '../components/loading'

function Users() {
  const dispatch = useDispatch()

  const { users, error, loading } = useSelector((state) => state.users)
  const { modals } = useSelector((state) => state.modals)

  const [hypeUsers, sethypeUsers] = useState(users)
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    dispatch(getUsersAction())
  }, [])

  useEffect(() => {
    sethypeUsers(users)
  }, [users])

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(usersActions.setError(null))
    dispatch(sponsoredActions.setError(null))
  }
  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }

  const onAddOpen = () => {
    openModal('addUser')
  }
  const onEditOpen = (user) => {
    setSelectedUser(user)
    openModal('editUser')
  }

  const onDeleteOpen = (user) => {
    setSelectedUser(user)
    openModal('deleteUser')
  }

  const onManageOpen = (user) => {
    setSelectedUser(user)
    openModal('manageSponsored')
  }

  const addHandler = (user) => {
    dispatch(addUserAction(user))
  }

  const editHandler = (user) => {
    dispatch(
      updateUserAction({
        ...user,
        userId: selectedUser._id
      })
    )
  }
  const deleteHandler = () => {
    dispatch(deleteUserAction(selectedUser._id))
  }

  const onChangeSearch = (value) => {
    sethypeUsers(
      users.filter((user) => user.name?.toLowerCase().trim().includes(value?.toLowerCase().trim()))
    )
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full gap-6">
          <UsersHead onChangeSearch={onChangeSearch} onAddOpen={onAddOpen} />
          <UsersTable
            users={hypeUsers}
            onEdit={onEditOpen}
            onDelete={onDeleteOpen}
            onManage={onManageOpen}
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.addUser}
            component={
              <AddUserModal
                useInfo={null}
                onSubmit={addHandler}
                okeyText="Add"
                onCancel={closeModal}
                title="Fill in User's Info"
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
            isOpen={modals.editUser}
            component={
              <AddUserModal
                useInfo={selectedUser}
                onSubmit={editHandler}
                okeyText="Update"
                onCancel={closeModal}
                title="Update User's Info"
                error={error}
              />
            }
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.manageSponsored}
            component={<ManageSponsoredModal useInfo={selectedUser} setUseInfo={setSelectedUser} />}
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
            isOpen={modals.deleteUser}
            title="Delete User"
            description="This action will delete this user, unconnect with sponsored and courses associated and delete associated bills, are you sure ?"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Users
