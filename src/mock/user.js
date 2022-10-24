export default [
  {
    url: "/token",
    type: "post",
    response: (req) => {
      const { username, password } = req.body;
      console.log(username, password);
      if (username === "admin" && password === "admin") {
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
];
