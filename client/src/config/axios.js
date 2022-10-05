import axios from "axios";
import env from "react-dotenv";
// Url of the server
const BASE_URL = env.API_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
