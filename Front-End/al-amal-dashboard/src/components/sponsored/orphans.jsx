import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalsActions } from '../../redux/reducers/modalsSlice'
import { sponsoredActions } from '../../redux/reducers/sponsoredSlice'
import {
  addOrphanAction,
  deleteOrphanAction,
  getOrphansAction,
  updateOrphanAction
} from '../../redux/actions/sponsoredActions'
import SponsoredHead from './SponsoredHead'
import Table from './table'
import MyModal from '../MyModal'
import AddSponsoredModal from './addSponsoredModal'
import Loading from '../loading'

const Orphans = () => {
  const dispatch = useDispatch()
  const { orphans, error, loading } = useSelector((state) => state.sponsored)
  const [hypeOrphans, sethypeOrphans] = useState(orphans)

  useEffect(() => {
    dispatch(getOrphansAction())
  }, [])

  useEffect(() => {
    sethypeOrphans(orphans)
  }, [orphans])

  const { modals } = useSelector((state) => state.modals)
  const [selectedOrphan, setSelectedOrphan] = useState({})

  const closeModal = () => {
    dispatch(modalsActions.closeModals())
    dispatch(sponsoredActions.setError(null))
  }
  const openModal = (modalName) => {
    dispatch(modalsActions.openModal(modalName))
  }
  const onAddOpen = () => {
    openModal('addOrphan')
  }

  const onEditOpen = (orphan) => {
    setSelectedOrphan(orphan)
    openModal('editOrphan')
  }

  const onDeleteOpen = (orphan) => {
    setSelectedOrphan(orphan)
    openModal('deleteOrphan')
  }

  const addHandler = (orphan) => {
    dispatch(addOrphanAction(orphan))
  }

  const editHandler = (orphan) => {
    dispatch(
      updateOrphanAction({
        ...orphan,
        orphanId: selectedOrphan._id
      })
    )
  }
  const deleteHandler = () => {
    dispatch(deleteOrphanAction(selectedOrphan._id))
  }

  const onChangeSearch = (value) => {
    sethypeOrphans(
      orphans.filter((orphan) =>
        orphan.name?.toLowerCase().trim().includes(value?.toLowerCase().trim())
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
            textAdd="Add Orphan"
            onAddOpen={onAddOpen}
            onChangeSearch={onChangeSearch}
          />
          <Table type="orphan" array={hypeOrphans} onEdit={onEditOpen} onDelete={onDeleteOpen} />
          <MyModal
            hasBody
            hasX
            canHideWhenClickOutSide
            onClose={closeModal}
            isOpen={modals.addOrphan}
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
            isOpen={modals.editOrphan}
            component={
              <AddSponsoredModal
                useInfo={selectedOrphan}
                onSubmit={editHandler}
                okeyText="Update"
                onCancel={closeModal}
                title="Update Orphan's Info"
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
            isOpen={modals.deleteOrphan}
            title="Delete Orphan"
            description="This action will delete this orphan, remove it from associated user and delete associated bill, are you sure ?"
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default Orphans
