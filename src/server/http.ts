import axios from 'axios'
import StorageManager from '@/utils/storage'

// set authorization header if token exists
axios.interceptors.request.use((config) => {
  const storage = new StorageManager()
  const token = storage.getToken()
  if (token && config.headers) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
