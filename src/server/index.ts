import axios from './http'
export function upload(data: FormData) {
  return axios.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
