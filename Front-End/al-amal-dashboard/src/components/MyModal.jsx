import { useRef } from 'react'

export default function MyModal({
  isOpen,
  title,
  description,
  hasX,
  hasCancel,
  hasOkay,
  onCancel,
  onOkay,
  onClose,
  hasBody,
  hasIcon,
  Icon,
  hasTitle,
  hasDescription,
  hasFooter,
  component,
  canHideWhenClickOutSide,
  okeyText = 'Okay',
  cancelText = 'Cancel',
  error,
  wide = false
}) {
  const modalRef = useRef(null)

  const checkIfClickedOutside = (e) => {
    if (!modalRef.current?.contains(e.target)) {
      canHideWhenClickOutSide && onClose && onClose()
    }
  }

  return isOpen ? (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={checkIfClickedOutside}
    >
      <div className="fixed inset-0 h-screen bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            ref={modalRef}
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  my-8  w-full ${
              wide ? 'max-w-4xl' : 'max-w-lg'
            }`}
          >
            {hasX ? (
              <button
                onClick={onClose}
                type="button"
                className="absolute right-3 top-3 z-50 inline-flex justify-center rounded-md bg-white p-1 px-3 text-lg text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                X
              </button>
            ) : null}

            {hasBody ? (
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start flex-col">
                  {hasIcon ? (
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {Icon}
                    </div>
                  ) : null}
                  {hasTitle || hasDescription ? (
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      {hasTitle ? (
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          {title}
                        </h3>
                      ) : null}
                      {hasDescription ? (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {component ? component : null}

                  {error ? (
                    <div className="px-4 mt-4">
                      <p className="text-sm text-pink-700">{error}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {hasFooter ? (
              <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {hasOkay ? (
                  <button
                    onClick={onOkay}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md  bg-[#5774cb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
                  >
                    {okeyText}
                  </button>
                ) : null}
                {hasCancel ? (
                  <button
                    onClick={onCancel}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    {cancelText}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null
}
