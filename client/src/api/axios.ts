import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://workouts-api-fzz9.onrender.com/api"
    : import.meta.env.BASE_URL,
});

export default axiosInstance;
