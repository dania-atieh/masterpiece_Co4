import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { errorsMapper } from '../../utils/errorsMapper'

const ForgotPassword = () => {
  const [info, setInfo] = useState({
    email: '',
    code: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showCode, setShowCode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  const onSubmitEmail = async () => {
    setErrorMessage('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/auth/forgot-password`, {
        email: info.email
      })
      if (response.data.status === 'success') {
        setShowCode(true)
        setErrorMessage('')
      } else {
        setErrorMessage('Something went wrong.')
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }
  const onSubmitReset = async () => {
    setErrorMessage('')
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_URL}/auth/reset-password/${info.code}`,
        {
          password: info.password
        }
      )
      if (response.data.status === 'success') {
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      } else {
        setErrorMessage('Something went wrong.')
      }
    } catch (error) {
      setErrorMessage(errorsMapper(error.response.data.message))
    }
  }

  return (
    <div className="flex justify-center items-center bg-[#eef1fa] h-screen flex-col gap-6">
      <div className="bg-white p-10 rounded-2xl shadow max-w-[400px] min-w-[400px]">
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <img src={logo} className="w-20" />
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault()
              !showCode ? onSubmitEmail() : onSubmitReset()
            }}
          >
            <div className="flex flex-col items-center w-full gap-6">
              {!showCode ? (
                <input
                  onChange={(e) => {
                    setInfo({ ...info, email: e.target.value })
                  }}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="p-4 border text-[#55697e] text-xs w-full rounded"
                />
              ) : (
                <>
                  <p className="text-sm text-green-400 text-start w-full">
                    We have sent the reset code to your email, <br /> write it below please.
                  </p>
                  <input
                    onChange={(e) => {
                      setInfo({ ...info, code: e.target.value })
                    }}
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Code"
                    className="p-4 border text-[#55697e] text-xs w-full rounded"
                  />
                  <p className="text-sm text-blue-400 text-start w-full">Write a new password</p>
                  <input
                    onChange={(e) => {
                      setInfo({ ...info, password: e.target.value })
                    }}
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="p-4 border text-[#55697e] text-xs w-full rounded"
                  />
                </>
              )}
              <button
                type="submit"
                className="rounded bg-[#5774cb] flex gap-3 justify-center items-center p-2 text-white text-lg w-full"
              >
                Send
              </button>
            </div>
          </form>

          <div className="flex justify-end w-full gap-8">
            <Link to="/login" className="text-sm underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      {errorMessage && <p className="text-pink-700 text-sm text-start">{errorMessage}</p>}
    </div>
  )
}

export default ForgotPassword
