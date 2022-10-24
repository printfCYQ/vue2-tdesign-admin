import { post } from "./request";

const create = ({ username, password }) => {
  return post("/token", { username, password });
};

export default {
  create,
};
