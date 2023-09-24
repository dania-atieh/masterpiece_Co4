import Interceptor from "./Interceptor";

export const getRequest = async (point) => {
  try {
    return await Interceptor.get(`/${point}`);
  } catch (error) {
    return error;
  }
};
export const postRequest = async (point, body) => {
  try {
    return await Interceptor.post(`/${point}`, body);
  } catch (error) {
    return error;
  }
};
export const deleteRequest = async (point) => {
  try {
    return await Interceptor.delete(`/${point}`);
  } catch (error) {
    return error;
  }
};
export const updateRequest = async (point, body) => {
  try {
    return await Interceptor.patch(`/${point}`, body);
  } catch (error) {
    return error;
  }
};
