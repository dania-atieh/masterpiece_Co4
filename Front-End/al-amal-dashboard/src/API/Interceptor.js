import axios from 'axios'

//setting up Axios instance named Interceptor with interceptors for handling HTTP requests and responses.
const Interceptor = axios.create({
  baseURL: import.meta.env.VITE_APP_URL
})
// intercept and modify outgoing HTTP requests before they are sent.
Interceptor.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return request
  },
  (error) => {
    return Promise.reject(error)//error is rejected, and the request is not sent. 
  }
)

//authorized
Interceptor.interceptors.response.use(
  (response) => {//response is successful, it is returned as is.
    return response
  },
  (error) => {
    if (error.response.status == 401) {//handling unauthorized responses
      localStorage.removeItem('token') // log user out
      window.location.href = window.location.origin //login
    }
    return Promise.reject(error)
  }
)
export default Interceptor
