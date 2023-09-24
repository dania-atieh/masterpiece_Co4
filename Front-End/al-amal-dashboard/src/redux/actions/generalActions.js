import { getRequest, postRequest } from '../../API'

export const getCounts = async () => {
  try {
    const { data } = await getRequest(`admin/get-counts`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getOrphansNotSelected = async () => {
  try {
    const { data } = await getRequest(`sponsored/get-orphans-not-selected`)
    return data
  } catch (error) {
    console.log(error)
  }
}
export const getFamiliesNotSelected = async () => {
  try {
    const { data } = await getRequest(`sponsored/get-families-not-selected`)
    return data
  } catch (error) {
    console.log(error)
  }
}
export const getCoursesNotSelected = async (obj) => {
  try {
    const { data } = await postRequest(`course/get-courses-not-selected`, obj)
    return data
  } catch (error) {
    console.log(error)
  }
}
