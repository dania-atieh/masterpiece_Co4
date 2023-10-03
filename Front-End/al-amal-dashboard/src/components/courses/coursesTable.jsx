import React from 'react'

const CoursesTable = ({ array, onEdit, onDelete, onViewUsers }) => {
  return (
    <React.Fragment>
      <div className="w-full flex flex-wrap gap-4">
        {array?.length === 0 && (
          <p className="w-full text-center">There is not any available course</p>
        )}
        {array?.map((course) => (
          <div
            key={course._id}
            className="max-w-xs min-w-[320px] max-h-[450px] bg-white border border-gray-200 rounded-lg shadow "
          >
            <Image url={course.courseImageUrl} />
            <div className="p-3 h-[150px] overflow-auto border-t divide-y">
              <Row name="Course Name" value={course.name} />
              <Row name="Description" value={course.description} />
              <Row name="Coach Name" value={course.coachName} />
              <Row name="Start Date" value={course.startDate} />
              <Row name="Age" value={course.age} />
              <Row name="Price" value={course.price} />
              <Row name="Period" value={course.period} />
              <Row name="Location" value={course.location} />
            </div>
            <Buttons {...{ onEdit, onDelete, onViewUsers, course }} />
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

const Image = ({ url }) => {
  return (
    <div className="w-full h-[180px] bg-slate-400/10">
      <img className="rounded-t-lg object-fill h-[180px] w-full" src={url} />
    </div>
  )
}

const Buttons = ({ onEdit, course, onDelete, onViewUsers }) => {
  return (
    <div className="flex items-center gap-4 justify-center w-full border-t p-4">
      <button
        onClick={() => {
          onViewUsers(course)
        }}
        className="font-medium text-green-600 hover:underline bg-green-600/5 py-2 px-5 rounded"
      >
        Users
      </button>
      <button
        onClick={() => {
          onEdit(course)
        }}
        className="font-medium text-sky-600 hover:underline bg-sky-600/5 py-2 px-5 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => {
          onDelete(course)
        }}
        className="font-medium text-red-600 hover:underline bg-red-600/5 py-2 px-5 rounded"
      >
        Delete
      </button>
    </div>
  )
}

const Row = ({ name, value }) => {
  return (
    <div className="w-full flex justify-between gap-4  p-2">
      <p className="text-sm  whitespace-nowrap">{name}</p>
      <p className="text-sm text-slate-600 truncate overflow-hidden">{value}</p>
    </div>
  )
}

export default CoursesTable
