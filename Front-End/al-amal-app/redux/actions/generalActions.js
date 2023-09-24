import { getRequest, postRequest } from "../../API";

export const getCoursesAction = async () => {
  try {
    const { data } = await getRequest(`course/get-courses`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const subToCourseAction = async (courseId) => {
  try {
    const { data } = await postRequest(`course/sup-to-course`, { courseId });
    return data;
  } catch (error) {
    console.log(error);
  }
};
