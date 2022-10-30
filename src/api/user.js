import { get, post } from "./request";

const me = () => {
  return get("/getCurrentUser");
};

const create = (data) => {
  return post("/user/create", data);
};

const findById = (id) => {
  return get(`/user`, { params: id });
};

const update = (fields) => {
  return post(`/user/update`, fields);
};

const remove = (id) => {
  return post(`/user/del`, { userId: id });
};

const list = (filter) => {
  return get("/users", { params: filter });
};

export default {
  me,
  create,
  findById,
  update,
  remove,
  list,
};
