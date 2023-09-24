import { deleteRequest, getRequest, updateRequest } from "../../API";
import { setMyToken } from "../../utils/token";
import { profileActions } from "../reducers/profileSlice";
import Toast from "react-native-toast-message";

export const getMeAction = () => async (dispatch) => {
  dispatch(profileActions.startLoading());
  try {
    const { data } = await getRequest(`auth/get-me`);
    dispatch(profileActions.updateMe(data));
  } catch (error) {
    console.log(error);
  }
};
export const updateMeAction = (user, callback) => async (dispatch) => {
  dispatch(profileActions.startLoading());
  try {
    const response = await updateRequest(`auth/update-me`, user);
    if (response.status === 200) {
      dispatch(profileActions.updateMe(response.data));
      Toast.show({
        type: "success",
        text1: "تم تحديث المعلومات بنجاح",
      });
      callback();
      return;
    }
    dispatch(
      profileActions.setError(
        response.response?.data?.message ?? "Something went wrong.",
      ),
    );
    dispatch(profileActions.stopLoading());
  } catch (error) {
    console.log(error);
  }
};
export const updateMyPassword = (user, callback) => async (dispatch) => {
  dispatch(profileActions.startLoading());
  try {
    const response = await updateRequest(`auth/update-my-password`, user);
    if (response.status === 200) {
      await setMyToken(response?.data?.token);
      Toast.show({
        type: "success",
        text1: "تم تحديث كلمة السر",
      });
      dispatch(profileActions.setError(null));
      dispatch(profileActions.stopLoading());
      callback();
      return;
    }
    dispatch(
      profileActions.setError(
        response.response?.data?.message ?? "Something went wrong.",
      ),
    );
    dispatch(profileActions.stopLoading());
  } catch (error) {
    console.log(error);
  }
};

export const deleteMeAction = (callback) => async (dispatch) => {
  try {
    const response = await deleteRequest(`auth/delete-me`);
    if (response.status === 204) {
      await setMyToken("");
      Toast.show({
        type: "success",
        text1: "تم حذف الحساب",
      });
      dispatch(profileActions.setError(null));
      callback();
      return;
    }
    dispatch(
      profileActions.setError(
        response.response?.data?.message ?? "Something went wrong.",
      ),
    );
  } catch (error) {
    console.log(error);
  }
};
