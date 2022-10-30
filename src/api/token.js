import { post } from "./request";

const create = ({ email, password }) => {
  return post("/login", { email, password });
};

export default {
  create,
};
