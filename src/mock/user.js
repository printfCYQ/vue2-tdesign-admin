export default [
  {
    url: "/token",
    type: "post",
    response: (req) => {
      const { email, password } = req.body;
      if (email === "admin" && password === "admin") {
        return {
          code: 200,
          token: "asdsdsd",
          message: "登陆成功",
        };
      }
      return {
        code: 400,
        message: "用户名或密码错误",
      };
    },
  },
  {
    url: "/users/me",
    type: "get",
    response: () => {
      return {
        code: 200,
        data: {
          username: "admin",
          nickname: "admin",
          roles: ["admin"],
          permissions: [
            "dashboard",
            "dashboard:base",
            "user",
            "user:list",
            "user:roles",
            "user:roles:add",
          ],
          // permissions: ["dashboard", "dashboard:base"],
        },
        message: "获取信息成功",
      };
    },
  },
];
