import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMeAction, updateMeAction, updateMyPassword } from '../redux/actions/myActions'
import { modalsActions } from '../redux/reducers/modalsSlice'
import MyModal from '../components/MyModal'
import UpdatePasswordModal from '../components/profile/updatePasswordModal'
import { profileActions } from '../redux/reducers/profileSlice'
import { useNavigate } from 'react-router-dom'
import ProfileForm from '../components/profile/ProfileForm'
import Loading from '../components/loading'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { profile, error, loading } = useSelector((state) => state.profile)
  const { modals } = useSelector((state) => state.modals)

  const [user, setUser] = useState({
    name: profile?.name,
    email: profile?.email,
    phoneNumber: profile?.phoneNumber,
    gender: profile?.gender
  })

  const onSubmitForm = (e) => {
    e.preventDefault()
    dispatch(updateMeAction(user))
  }

  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }
  const openModalUpdatePass = () => {
    openModal('updateMyPassword')
  }
  const openModalDeleteMe = () => {
    openModal('deleteMyAccount')
  }

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(profileActions.setError(null))
  }

  const updatePasswordHandler = (payload) => {
    dispatch(updateMyPassword(payload))
  }

  const deleteMeHandler = () => {
    dispatch(
      deleteMeAction(() => {
        navigate('login')
      })
    )
  }

  const isDisabled =
    user.name !== profile.name ||
    user.email !== profile.email ||
    user.phoneNumber !== profile.phoneNumber ||
    user.gender !== profile.gender

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full gap-6">
          <ProfileForm
            isDisabled={isDisabled}
            setUser={setUser}
            onSubmitForm={onSubmitForm}
            openModalUpdatePass={openModalUpdatePass}
            user={user}
            error={error}
            openModalDeleteMe={openModalDeleteMe}
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.updateMyPassword}
            component={
              <UpdatePasswordModal
                onSubmit={updatePasswordHandler}
                onCancel={closeModal}
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
            onOkay={deleteMeHandler}
            isOpen={modals.deleteMyAccount}
            title="Delete Your Account"
            description="This action will delete your account, are you sure ?"
            error={error}
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Profile
