import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  validateStatus: false,
});

export default axiosRequest;
