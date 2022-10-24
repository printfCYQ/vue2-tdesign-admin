import axios from "axios";
import { MessagePlugin } from "tdesign-vue";

const BASE_URL = process.env.VUE_APP_BASE_API;
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      MessagePlugin.error(res.message);
      return Promise.reject(new Error(res.message));
    }
    return response.data;
  },
  (err) => {
    MessagePlugin.error(err.message);
    return Promise.reject(err);
  }
);

const { get, post } = instance;

export { get, post };
