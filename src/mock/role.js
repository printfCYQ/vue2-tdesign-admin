export default [
  {
    url: "/roles",
    type: "post",
    response: (req) => {
      const role = req.body;
      return {
        code: 200,
        data: role,
        message: "新建成功",
      };
    },
  },
  {
    url: "/roles",
    type: "get",
    response: () => {
      return {
        code: 200,
        data: [
          {
            id: "role_admin",
            name: "ROLE_ADMIN",
            label: "管理员",
            permissions: [
              "dashboard",
              "dashboard:base",
              "user",
              "user:list",
              "user:roles",
              "user:roles:add",
            ],
          },
          {
            id: "role_user",
            name: "ROLE_USER",
            label: "游客",
            permissions: ["dashboard", "dashboard:base"],
          },
        ],
        message: "获取成功",
      };
    },
  },
];
