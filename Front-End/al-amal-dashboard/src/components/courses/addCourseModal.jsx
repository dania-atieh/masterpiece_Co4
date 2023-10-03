import { useState } from 'react'
import UploadFile from '../sponsored/UploadFile'

function AddUserModal({ onSubmit, error, useInfo, okeyText, onCancel, title }) {
  const [info, setInfo] = useState({
    name: useInfo?.name || '',
    coachName: useInfo?.coachName || '',
    courseImageUrl: useInfo?.courseImageUrl || '',
    startDate: useInfo?.startDate || '',
    age: useInfo?.age || '',
    price: useInfo?.price || '',
    period: useInfo?.period || '',
    location: useInfo?.location || '',
    description: useInfo?.description || ''
  })

  const onSubmitForm = (e) => {
    e.preventDefault()
    onSubmit(info)
  }
  return (
    <form className=" p-4 flex flex-col gap-6 w-full" onSubmit={onSubmitForm}>
      <p className="text-xl font-semibold leading-7 text-gray-500">{title}</p>
      <div className="flex gap-4 w-full">
        <InputField info={info} setInfo={setInfo} field={'name'} name="Course Name" type="text" />
        <InputField
          info={info}
          setInfo={setInfo}
          field={'coachName'}
          name="Coach Name"
          type="text"
        />
      </div>
      <div className="flex gap-4 w-full">
        <InputField
          info={info}
          setInfo={setInfo}
          field={'startDate'}
          name="Start Date"
          type="Date"
        />
        <InputField info={info} setInfo={setInfo} field={'location'} name="Location" type="text" />
      </div>
      <div className="flex gap-4 w-full">
        <InputField info={info} setInfo={setInfo} field={'age'} name="Age (min 13)" type="number" />
        <InputField
          info={info}
          setInfo={setInfo}
          field={'price'}
          name="Price (min 1)"
          type="number"
        />
      </div>
      <InputField
        info={info}
        setInfo={setInfo}
        field={'description'}
        name="Description"
        type="text"
      />
      <div className="flex gap-4 w-full">
        <ImgField info={info} setInfo={setInfo} type="text" />
        <InputField info={info} setInfo={setInfo} field={'period'} name="Period" type="text" />
      </div>
      <ErrorField error={error} />
      <Buttons okeyText={okeyText} onCancel={onCancel} />
    </form>
  )
}

export default AddUserModal

const InputField = ({ info, setInfo, field, name, type }) => {
  const currentDate = new Date().toISOString().split('T')[0]

  return (
    <div className="w-full">
      <label htmlFor={field} className="block mb-2 text-sm font-medium text-gray-900">
        * {name}
      </label>
      <input
        id={field}
        value={info[field]}
        onChange={(e) => {
          setInfo({
            ...info,
            [field]: e.target.value
          })
        }}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        required
        min={type == 'Date' ? currentDate : undefined}
      />
    </div>
  )
}

const ImgField = ({ info, setInfo }) => {
  return (
    <div className="w-full">
      <label htmlFor="social_study" className="block mb-2 text-sm font-medium text-gray-900  ">
        * Course Image
        {info.courseImageUrl && <span className="text-green-600">{' (exist)'}</span>}
      </label>
      <div className="w-full flex gap-2">
        {info.courseImageUrl && (
          <a
            className="inline-flex w-full justify-center rounded-md  bg-[#5774cb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
            target="_blank"
            href={info?.courseImageUrl}
            rel="noreferrer"
          >
            View
          </a>
        )}
        <UploadFile
          currentUrl={info.courseImageUrl}
          type={'img'}
          onUrl={(url) => {
            setInfo({
              ...info,
              courseImageUrl: url
            })
          }}
        />
      </div>
    </div>
  )
}

const ErrorField = ({ error }) => {
  return (
    <>
      {error ? (
        <div>
          <p className="text-sm text-pink-700">{error}</p>{' '}
        </div>
      ) : null}
    </>
  )
}

const Buttons = ({ okeyText, onCancel }) => {
  return (
    <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="submit"
        className="inline-flex w-full justify-center rounded-md  bg-[#5774cb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
      >
        {okeyText}
      </button>
      <button
        onClick={onCancel}
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      >
        Cancel
      </button>
    </div>
  )
}

const ChoiceField = ({ setInfo, info }) => {
  return (
    <div className="w-full">
      <div className="flex h-full flex-col ">
        <p className="block mb-2 text-sm font-medium text-gray-900">Period</p>
        <div className="flex justify-start items-center gap-6 h-full">
          <div className="flex items-center ">
            <input
              onChange={() => {
                setInfo({
                  ...info,
                  period: 'morning'
                })
              }}
              id="default-radio-1"
              type="radio"
              checked={info?.period == 'morning'}
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2  "
            />
            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900  ">
              Morning
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked={info?.period == 'evening'}
              onChange={() => {
                setInfo({
                  ...info,
                  period: 'evening'
                })
              }}
              id="default-radio-2"
              type="radio"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2  "
            />
            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900  ">
              Evening
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
