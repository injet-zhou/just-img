import axios from 'axios'
import StorageManager from '@/utils/storage'
import { useRouter } from 'vue-router'
import _ from 'lodash'

const showMessage = (msg: string) => {
  try {
    window.$message.error(msg)
  } catch (e) {
    console.log(msg)
    console.warn(
      '$message is not initialized. Please use the following code to initialize it when the component is mounted: window.$message = useMessage()'
    )
  }
}

/**
 * 处理请求错误
 * @param data {Object} 请求返回的数据
 * @param code {Number} 请求返回的状态码
 */
const requestErrorHandler = (data: any, code: number) => {
  const router = useRouter()
  const storage = new StorageManager()
  switch (code) {
    case 403:
      storage.clearToken()
      break
    case 401:
      showMessage('登录失效，请重新登录')
      router.push('/login')
      break
    case 404:
      showMessage('请求资源不存在')
      break
    default:
      showMessage(data.msg || '请求失败')
  }
}

const throttled = _.throttle(requestErrorHandler, 1000, {})

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
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
    if (error.response && error.response.data) {
      throttled(error.response.data, error.response.status)
    }
    return Promise.reject(error)
  }
)

export default axios
