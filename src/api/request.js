import store from "@/store";
import axios from "axios";
import { MessagePlugin } from "tdesign-vue";
const BASE_URL = process.env.VUE_APP_BASE_API;
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((request) => {
  if (store.state.token) {
    request.headers["Authorization"] = "Bearer " + store.state.token;
  }
  return request;
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
  async (err) => {
    await handelResponseError(err);
    return Promise.reject(err);
  }
);

const handelResponseError = async (err) => {
  console.log(err);
  const { response } = err;
  if (err.code === 401) {
    await store.dispatch("logout");
  }
  await MessagePlugin.error(response.data.message);
};
const { get, post } = instance;

export { get, post };
