import Mock from "mockjs";
import userMock from "./user";

const BASE_URL = process.env.VUE_APP_BASE_API;

[...userMock].map((mock) => {
  Mock.mock(BASE_URL + mock.url, mock.type, (req) => {
    req.body = JSON.parse(req.body);
    return mock.response(req);
  });
});
