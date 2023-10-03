import enErrors from './errors/en.json'
export const errorsMapper = (errorName) => {
  const isArray = Array.isArray(errorName)
  if (isArray) {
    return errorName.map((err) => `- ${enErrors[err] ?? err}`)
  } else {
    return enErrors[errorName] ?? errorName
  }
}
