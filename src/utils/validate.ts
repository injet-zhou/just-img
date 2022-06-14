import Sugar from 'sugar'

const isValidEmail = (email: string): boolean => {
  if (Sugar().String.isBlank(email)) {
    return false
  }
  const reg =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  return reg.test(email)
}

export default {
  isValidEmail,
}
