import axios from 'axios'
const Interceptor = axios.create({
  baseURL: import.meta.env.VITE_APP_URL
})
Interceptor.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

Interceptor.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem('token')
      window.location.href = window.location.origin
    }
    return Promise.reject(error)
  }
)
export default Interceptor
