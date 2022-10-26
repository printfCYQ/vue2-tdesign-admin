import { get, post } from "./request";

const create = (data) => {
  return post("/roles", data);
};

const update = (id, fields) => {
  return post(`/roles/${id}`, fields);
};

const remove = (id) => {
  return post(`/roles/${id}/detele`);
};

const list = (filter) => {
  return get("/roles", { params: filter });
};
export default {
  create,
  update,
  remove,
  list,
};
