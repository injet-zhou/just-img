import Sugar from 'sugar'

const trim = (str: string): string => {
  const string = Sugar.String
  str = string.trimLeft(str)
  str = string.trimRight(str)
  return str
}

export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binStr = window.atob(base64)
  const len = binStr.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binStr.charCodeAt(i)
  }
  return bytes.buffer
}

export default {
  trim,
}
