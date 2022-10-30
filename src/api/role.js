import { get, post } from "./request";

const create = (data) => {
  return post("/role/create", data);
};

const findById = (id) => {
  return get(`/role`, { params: id });
};

const update = (fields) => {
  return post(`/role/update`, fields);
};

const remove = (id) => {
  return post(`/role/del`, { roleId: id });
};

const list = (filter) => {
  return get("/roles", { params: filter });
};
export default {
  create,
  findById,
  update,
  remove,
  list,
};
