import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
