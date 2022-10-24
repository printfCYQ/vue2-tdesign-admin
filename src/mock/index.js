import Mock from "mockjs";

const BASE_URL = process.env.VUE_APP_BASE_API;
console.log(BASE_URL);

Mock.mock(`${BASE_URL}/token`, () => {
  return "123";
});
