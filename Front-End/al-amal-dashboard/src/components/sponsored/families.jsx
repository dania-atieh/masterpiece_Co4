import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalsActions } from '../../redux/reducers/modalsSlice'
import { sponsoredActions } from '../../redux/reducers/sponsoredSlice'
import {
  addFamilyAction,
  deleteFamilyAction,
  getFamiliesAction,
  updateFamilyAction
} from '../../redux/actions/sponsoredActions'
import SponsoredHead from './SponsoredHead'
import Table from './table'
import MyModal from '../MyModal'
import AddSponsoredModal from './addSponsoredModal'
import Loading from '../loading'

const Families = () => {
  const dispatch = useDispatch()
  const { families, error, loading } = useSelector((state) => state.sponsored)
  const [hypeFamilies, sethypeFamilies] = useState(families)

  useEffect(() => {
    dispatch(getFamiliesAction())
  }, [])

  useEffect(() => {
    sethypeFamilies(families)
  }, [families])

  const { modals } = useSelector((state) => state.modals)
  const [selectedFamily, setSelectedFamily] = useState({})

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(sponsoredActions.setError(null))
  }
  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }
  const onAddOpen = () => {
    openModal('addFamily')
  }

  const onEditOpen = (family) => {
    setSelectedFamily(family)
    openModal('editFamily')
  }

  const onDeleteOpen = (family) => {
    setSelectedFamily(family)
    openModal('deleteFamily')
  }

  const addHandler = (family) => {
    dispatch(addFamilyAction(family))
  }

  const editHandler = (family) => {
    dispatch(
      updateFamilyAction({
        ...family,
        familyId: selectedFamily._id
      })
    )
  }

  const deleteHandler = () => {
    dispatch(deleteFamilyAction(selectedFamily._id))
  }

  const onChangeSearch = (value) => {
    sethypeFamilies(
      families.filter((family) =>
        family.name?.toLowerCase().trim().includes(value?.toLowerCase().trim())
      )
    )
  }

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-4">
          <SponsoredHead
            textAdd="Add Family"
            onAddOpen={onAddOpen}
            onChangeSearch={onChangeSearch}
          />
          <Table type="family" array={hypeFamilies} onEdit={onEditOpen} onDelete={onDeleteOpen} />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.addFamily}
            component={
              <AddSponsoredModal
                onSubmit={addHandler}
                onCancel={closeModal}
                error={error}
                okeyText="Add"
              />
            }
          />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.editFamily}
            component={
              <AddSponsoredModal
                useInfo={selectedFamily}
                onSubmit={editHandler}
                okeyText="Update"
                onCancel={closeModal}
                title="Update Family's Info"
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
            isOpen={modals.deleteFamily}
            title="Delete Family"
            description="This action will delete this orphan, remove it from associated user and delete associated bill, are you sure ?"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Families
