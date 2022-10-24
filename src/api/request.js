import axios from "axios";

const BASE_URL = process.env.VUE_APP_BASE_API;
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use((response) => {
  return response.data;
});

const { get, post } = instance;

export { get, post };
