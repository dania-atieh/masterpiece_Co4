import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
  }, [])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('*Name is required'),
    email: Yup.string().required('*Email is required').email('*Invalid email address'),
    password: Yup.string().required('Password is required'),
    secret: Yup.string().required('Secret is required')
  })

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/admin/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
        secret: values.secret
      })
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      } else {
        setErrorMessage('Something went wrong.')
      }
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }

    setSubmitting(false)
  }

  return (
    <div className="flex justify-center items-center bg-[#eef1fa] h-screen flex-col gap-6">
      <div className='text-sm text-red-400'>
        <p>- Note that Sign up is restricted to Administrators.</p>
        <p>- You have to provide the secret word in order to sign up.</p>
      </div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <div className="bg-white p-10 rounded-2xl shadow min-w-[400px]">
            <Form className="flex flex-col justify-center items-center gap-6 w-full">
              <img src={logo} className="w-20" />
              <div className="flex flex-col items-center w-full gap-6">
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="p-4 border text-[#55697e] text-xs w-full rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-pink-700 text-sm text-start w-full"
                />
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
                <Field
                  type="password"
                  id="secret"
                  name="secret"
                  placeholder="Secret"
                  className="p-4 border text-[#55697e] text-xs w-full rounded"
                />
                <ErrorMessage
                  name="secret"
                  component="div"
                  className="text-pink-700 text-sm text-start w-full"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-[#5774cb] flex gap-3 justify-center items-center p-2 text-white text-lg w-full"
                >
                  Signup
                </button>
              </div>
              <div className="flex justify-between w-full gap-8">
                <p className='text-sm'>Have an account? </p>
                <Link to="/login" className='text-sm underline'>Login</Link>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {errorMessage && <p className="text-pink-700 text-sm text-start">{errorMessage}</p>}
    </div>
  )
}

export default SignUp
