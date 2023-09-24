import axios from "axios";
import { navigateTo } from "../utils/navigation";
import { getMyToken, setMyToken } from "../utils/token";

const Interceptor = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

Interceptor.interceptors.request.use(
  async (request) => {
    const token = await getMyToken();
    request.headers["Authorization"] = "Bearer " + token;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Interceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      navigateTo("Login");
      await setMyToken("");
    }
    return Promise.reject(error);
  },
);
export default Interceptor;
