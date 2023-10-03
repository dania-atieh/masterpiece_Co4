import React from 'react'

const BillsTable = ({ bills, onEdit, onDelete }) => {
  return (
    <React.Fragment>
      <div className="w-full flex flex-wrap gap-4">
        {bills?.length === 0 && (
          <p className="w-full text-center">There is not any available bill</p>
        )}
        {bills?.map((bill) => (
          <div
            key={bill._id}
            className="max-w-xs min-w-[320px] max-h-[450px] bg-white border border-gray-200 rounded-lg shadow "
          >
            <Image url={bill.billFileUrl} />
            <div className="p-3 h-[150px] overflow-auto border-t divide-y">
              <Row name="Owner" value={bill.id_user?.name} />
              <Row
                name="Sponsored"
                value={
                  bill.id_orphan
                    ? `orphan / ${bill.id_orphan?.name}`
                    : bill.id_family
                    ? `family / ${bill.id_family?.name}`
                    : ''
                }
              />
              <Row name="Payments" value={bill.payments} />
              <Row name="Description" value={bill.description} />
            </div>
            <Buttons {...{ onEdit, onDelete, bill }} />
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

const Buttons = ({ onEdit, bill, onDelete }) => {
  return (
    <div className="flex items-center gap-4 justify-end w-full border-t p-4">
      <button
        onClick={() => {
          onEdit(bill)
        }}
        className="font-medium text-sky-600 hover:underline bg-sky-600/5 py-2 px-5 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => {
          onDelete(bill)
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

export default BillsTable
