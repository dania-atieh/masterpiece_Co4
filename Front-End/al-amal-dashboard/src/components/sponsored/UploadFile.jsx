import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import { storageAuth } from '../../../firebase/firebase'

const UploadFile = ({ type, onUrl, currentUrl }) => {
  const [filePrec, setfilePrec] = useState(0)
  const handleChangeImg = (e) => {
    const fileName = new Date().getTime() + e.target.files[0].name
    const storageRef = ref(storageAuth, fileName)
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0])

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setfilePrec(Math.round(progress))

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            break
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onUrl(downloadURL)
        })
      }
    )
  }

  return (
    <div className="flex flex-wrap">
      <label
        htmlFor="upload"
        className="cursor-pointer inline-flex w-full justify-center rounded-md bg-[#5774cb] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 sm:ml-3 sm:w-auto"
      >
        {type == 'img' && (
          <div>
            <p className="font-bold mx-2">{currentUrl ? 'update' : 'upload image'}</p>
            <input type="file" accept="image/*" onChange={handleChangeImg} hidden id="upload" />
          </div>
        )}
        {type == 'pdf' && (
          <div>
            <p className="font-bold mx-2">{currentUrl ? 'update' : 'upload pdf'}</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleChangeImg}
              hidden
              id="upload"
            />
          </div>
        )}
      </label>
      <p className={`m-2 text-sm ${filePrec === 100 && 'text-green-500'}`}>
        {filePrec > 0 && filePrec < 99 && 'Uploading:' + filePrec + '%'}
        {filePrec === 100 && 'done' + ' ' + filePrec + '%'}
      </p>
    </div>
  )
}

export default UploadFile
