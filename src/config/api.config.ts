import { BASE_URL } from "./constants";
import axios from "axios";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getRefreshToken = async (refreshToken: string) => {
  const response = await instance.post("/auth/token/refresh", {
    refresh: refreshToken,
  });

  return response.data;
};

// axios interceptor to handle authenticated routes
instance.interceptors.request.use((config) => {
  const store = JSON.parse(localStorage.getItem("user-storage") || "{}");
  const token = store?.state?.accessToken;

  if (
    token &&
    !["/auth/login", "/auth/signup", "/auth/google"].includes(config?.url || "")
  )
    config.headers["Authorization"] = "Bearer " + token;
  return config;
});

// Axios interceptor to handle 401 errors and refresh token
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const store = JSON.parse(localStorage.getItem("user-storage") || "{}");
      const refreshToken: string = store?.state?.refreshToken || "";

      if (refreshToken) {
        // eslint-disable-next-line no-useless-catch
        try {
          const refreshedToken = await getRefreshToken(refreshToken);
          // If token is refreshed successfully, update the localStorage and retry the original request
          const store = JSON.parse(
            localStorage.getItem("user-storage") || "{}",
          );
          store.state.accessToken = refreshedToken.accessToken;
          localStorage.setItem("user-storage", JSON.stringify(store));
          originalRequest.headers.Authorization = `Bearer ${refreshedToken.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("user-storage");
          // Handle error when refresh token fails
          throw refreshError;
        }
      } else {
        // Handle case when refresh token is not available
        throw new Error("Refresh token not found");
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
