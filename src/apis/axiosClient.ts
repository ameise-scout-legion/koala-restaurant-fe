import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://koala-restaurant.vercel.app/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
