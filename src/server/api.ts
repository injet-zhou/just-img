import axios from './http'

const login = (req: Uint8Array) => {
  const blob = new Blob([req], { type: 'buffer' })
  return axios({
    method: 'POST',
    url: '/user/login',
    headers: {
      'Content-Type': 'application/x-protobuf',
    },
    data: blob,
  })
}

const register = (req: Uint8Array) => {
  const blob = new Blob([req], { type: 'buffer' })
  return axios({
    method: 'POST',
    url: '/user/register',
    headers: {
      'Content-Type': 'application/x-protobuf',
    },
    data: blob,
  })
}

function upload(data: FormData) {
  return axios.post('/file/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

function platforms() {
  return axios.get('/config/platforms')
}

function imageList(req: any) {
  return axios.post('/file/image/list', req)
}

function userList(req: any) {
  return axios.post('/user/list', req)
}

export default {
  login,
  upload,
  register,
  platforms,
  imageList,
  userList,
}
