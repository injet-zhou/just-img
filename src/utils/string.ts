import Sugar from 'sugar'

const trim = (str: string): string => {
  const string = Sugar.String
  str = string.trimLeft(str)
  str = string.trimRight(str)
  return str
}

export default {
  trim,
}
