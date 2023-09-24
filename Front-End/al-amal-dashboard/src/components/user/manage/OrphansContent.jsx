import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabel from './tabel'
import AddUserSponsored from './AddUserSponsored'
import { getOrphansNotSelected } from '../../../redux/actions/generalActions'
import Loading from '../../../components/loading'
import { usersActions } from '../../../redux/reducers/usersSlice'
import { addSponsoredToUser, deleteSponsoredFromUser } from '../../../redux/actions/usersActions'
import BackButton from './backbutton'
import MoreBills from './MoreBills'

const OrphansContent = ({ useInfo, setUseInfo, setTab }) => {
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.users)
  const [subTab, setSubTab] = useState('')
  const [selectedSponsord, setSelectedSponsord] = useState('')

  const openAddOrphan = () => {
    setSubTab('addOrphan')
  }
  const openAddBill = (selected) => {
    setSelectedSponsord(selected)
    setSubTab('addBill')
  }
  const closeSubTab = () => {
    dispatch(usersActions.setError(null))
    setSubTab('')
  }

  const onDeleteHandler = (id) => {
    const deleteCallBack = (responseInfo) => {
      setUseInfo(responseInfo)
    }
    dispatch(
      deleteSponsoredFromUser(
        {
          type: 'orphan',
          orphanId: id
        },
        deleteCallBack
      )
    )
  }

  const onAddOrphan = (info) => {
    const addCallBack = (responseInfo) => {
      setUseInfo(responseInfo)
      closeSubTab()
    }
    dispatch(
      addSponsoredToUser(
        {
          ...info,
          type: 'orphan',
          id_user: useInfo?._id,
          orphanId: info.sponserdId
        },
        addCallBack
      )
    )
  }

  return (
    <div className="h-full w-full mt-4">
      {subTab ? (
        <>
          {subTab == 'addOrphan' && (
            <AddUserOrphan onClose={closeSubTab} error={error} onAdd={onAddOrphan} />
          )}
          {subTab == 'addBill' && (
            <MoreBills
              onClose={closeSubTab}
              error={error}
              onAddBill={onAddOrphan}
              sponsord={selectedSponsord}
              username={useInfo?.name}
            />
          )}
        </>
      ) : (
        <>
          <BackButton
            onClick={() => {
              setTab('')
            }}
          />
          <div className="w-full flex justify-end">
            <button
              onClick={openAddOrphan}
              className="rounded bg-[#5774cb] flex gap-3 justify-center items-center py-2 px-6 text-white w-fit text-sm"
            >
              Add Orphan
            </button>
          </div>
          {useInfo?.orphans?.length > 0 ? (
            <>
              <p className="font-semibold capitalize">Orphans associated with this user</p>
              <Tabel
                type="orphan"
                array={useInfo?.orphans}
                onDelete={onDeleteHandler}
                onAddBill={openAddBill}
              />
            </>
          ) : (
            <div className="mt-4">No orphans associated with this user</div>
          )}
        </>
      )}
    </div>
  )
}

export default OrphansContent

const AddUserOrphan = ({ onClose, error, onAdd }) => {
  const [array, setArray] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    const data = await getOrphansNotSelected()
    setArray(data?.data?.orphans)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  return (
    <React.Fragment>
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Loading fullHeight={false} />
        </div>
      ) : (
        <AddUserSponsored
          onClose={onClose}
          array={array}
          error={error}
          type="orphan"
          onAdd={onAdd}
        />
      )}
    </React.Fragment>
  )
}
