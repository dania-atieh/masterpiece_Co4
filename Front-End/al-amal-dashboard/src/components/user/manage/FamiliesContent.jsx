import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabel from './tabel'
import AddUserSponsored from './AddUserSponsored'
import { usersActions } from '../../../redux/reducers/usersSlice'
import { getFamiliesNotSelected } from '../../../redux/actions/generalActions'
import Loading from '../../loading'
import { addSponsoredToUser, deleteSponsoredFromUser } from '../../../redux/actions/usersActions'
import BackButton from './backbutton'
import MoreBills from './MoreBills'

const FamiliesContent = ({ useInfo, setUseInfo, setTab }) => {
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.users)
  const [subTab, setSubTab] = useState('')

  const [selectedSponsord, setSelectedSponsord] = useState('')

  const openAddFamily = () => {
    setSubTab('addFamily')
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
          type: 'family',
          familyId: id
        },
        deleteCallBack
      )
    )
  }

  const onAddFamily = (info) => {
    const addCallBack = (responseInfo) => {
      setUseInfo(responseInfo)
      closeSubTab()
    }
    dispatch(
      addSponsoredToUser(
        {
          ...info,
          type: 'family',
          id_user: useInfo?._id,
          familyId: info.sponserdId
        },
        addCallBack
      )
    )
  }

  return (
    <div className="h-full w-full mt-4 flex flex-col gap-4">
      {subTab ? (
        <>
          {subTab == 'addFamily' && (
            <AddUserFamily onClose={closeSubTab} error={error} onAdd={onAddFamily} />
          )}
          {subTab == 'addBill' && (
            <MoreBills
              onClose={closeSubTab}
              error={error}
              onAddBill={onAddFamily}
              sponsord={selectedSponsord}
              username={useInfo?.name}
            />
          )}
        </>
      ) : (
        <>
          <p className="w-full text-center">Manage Families For {useInfo?.name}</p>
          <div className="absolute left-3 top-3">
            <BackButton
              onClick={() => {
                setTab('')
              }}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={openAddFamily}
              className="rounded bg-[#5774cb] flex gap-3 justify-center items-center py-2 px-6 text-white w-fit text-sm"
            >
              Add Family
            </button>
          </div>

          {useInfo?.families?.length > 0 ? (
            <>
              <p className="text-sm">Families associated with {useInfo?.name}</p>
              <Tabel
                type="family"
                array={useInfo?.families}
                onDelete={onDeleteHandler}
                onAddBill={openAddBill}
              />
            </>
          ) : (
            <p className="text-sm">No families associated with {useInfo?.name}</p>
          )}
        </>
      )}
    </div>
  )
}

export default FamiliesContent

const AddUserFamily = ({ onClose, error, onAdd }) => {
  const [array, setArray] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    const data = await getFamiliesNotSelected()
    setArray(data?.data?.families)
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
          type="family"
          onAdd={onAdd}
        />
      )}
    </React.Fragment>
  )
}
