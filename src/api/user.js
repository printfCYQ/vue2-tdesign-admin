import { get } from "./request";

const me = () => {
  return get("/users/me");
};

export default {
  me,
};
