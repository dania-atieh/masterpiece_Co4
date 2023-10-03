import AsyncStorage from "@react-native-async-storage/async-storage";

export const setMyToken = async (value = "") => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (e) {
    console.log(e);
  }
};

export const getMyToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      return token;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
