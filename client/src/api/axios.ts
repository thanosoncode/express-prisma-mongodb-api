import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.PROD
    ? "https://workouts-api-fzz9.onrender.com/api"
    : process.env.VITE_REACT_BASE_URL,
});

export default axiosInstance;
