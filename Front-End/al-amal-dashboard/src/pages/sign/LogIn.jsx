import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { errorsMapper } from '../../utils/errorsMapper'

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('*Email is required').email('*Invalid email address'),
    password: Yup.string().required('Password is required')
  })

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/admin/login`, {
        email: values.email,
        password: values.password
      })
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      } else {
        setErrorMessage('Something went wrong.')
      }
    } catch (error) {
      setErrorMessage(errorsMapper(error.response.data.message))
    }
    setSubmitting(false)
  }

  return (
    <div className="flex justify-center items-center bg-[#eef1fa] h-screen flex-col gap-6">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <div className="bg-white p-10 rounded-2xl shadow min-w-[400px]">
            <Form className="flex flex-col justify-center items-center gap-6 w-full">
              <img src={logo} className="w-20" />
              <h2>Welcome back! 👋🏻</h2>
              <div className="flex flex-col items-center w-full gap-6">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="p-4 border text-[#55697e] text-xs w-full rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-pink-700 text-sm text-start w-full"
                />
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="p-4 border text-[#55697e] text-xs w-full rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-pink-700 text-sm text-start w-full"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-[#5774cb] flex gap-3 justify-center items-center p-2 text-white text-lg w-full"
                >
                  Login
                </button>
              </div>
              <div className="flex justify-between w-full gap-8">
                <Link to="/forgot_password" className="text-sm">
                  Forgot password?
                </Link>
                <Link to="/signup" className="text-sm underline">
                  Signup
                </Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {errorMessage && <p className="text-pink-700 text-sm text-start">{errorMessage}</p>}
    </div>
  )
}

export default LogIn
